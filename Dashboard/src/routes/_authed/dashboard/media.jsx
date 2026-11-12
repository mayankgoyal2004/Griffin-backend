import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import Pager from "@/components/dashboard/Pager";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import { usePagedList } from "@/lib/usePagedList";
import { MEDIA_FOLDERS } from "@/lib/defaultContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Copy, FileText, ImageIcon, Loader2, Search, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/dashboard/media")({
  ssr: false,
  head: () => ({ meta: [{ title: "Media library — Griffin CMS" }] }),
  component: MediaPage,
});

const MAX_BYTES = 10 * 1024 * 1024;

function MediaPage() {
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("all");
  const [type, setType] = useState("all");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const { user } = Route.useRouteContext();

  const filter = {};
  if (search.trim()) filter.name = { $regex: search.trim() };
  if (folder !== "all") filter.folder = folder;
  if (type !== "all") filter.file_type = type;

  const list = usePagedList("MediaAsset", { filter, sort: "-created_date", limit: 18 });

  const uploadFiles = async (files) => {
    const items = Array.from(files || []);
    if (!items.length) return;
    setUploading(true);
    let uploaded = 0;
    for (const file of items) {
      if (file.size > MAX_BYTES) {
        toast.error(`${file.name} is larger than 10 MB.`);
        continue;
      }
      try {
        const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
        const isImage = file.type.startsWith("image/");
        await base44.entities.MediaAsset.create({
          name: file.name,
          file_url,
          file_type: isImage ? "Image" : "Document",
          mime_type: file.type,
          size: file.size,
          folder: folder === "all" ? "General" : folder,
          alt_text: "",
        });
        uploaded += 1;
      } catch (error) {
        toast.error(error.message || `Could not upload ${file.name}`);
      }
    }
    setUploading(false);
    if (uploaded) toast.success(`${uploaded} file${uploaded === 1 ? "" : "s"} uploaded`);
    list.refresh();
  };

  const remove = async (asset) => {
    await base44.entities.MediaAsset.delete(asset.id);
    toast.success("File removed from the library");
    list.refresh();
  };

  return (
    <div>
      <PageHeader title="Media library" description="Every image and document used across the website. Files are stored in cloud storage, never inside the database.">
        <Button size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />} Upload files
        </Button>
      </PageHeader>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
        className="hidden"
        onChange={(e) => {
          uploadFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          uploadFiles(e.dataTransfer.files);
        }}
        className="mb-4 rounded-lg border border-dashed border-border bg-white px-4 py-6 text-center text-xs text-muted-foreground"
      >
        Drag and drop files here to upload · JPG, PNG, WebP, SVG and PDF · max 10 MB each
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files" className="bg-white pl-9" />
        </div>
        <select value={folder} onChange={(e) => setFolder(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All folders</option>
          {MEDIA_FOLDERS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 text-sm">
          <option value="all">All file types</option>
          <option value="Image">Images</option>
          <option value="Document">Documents</option>
        </select>
      </div>

      {list.loading && <div className="py-10 text-center text-sm text-muted-foreground">Loading media…</div>}
      {!list.loading && list.items.length === 0 && (
        <EmptyState icon={ImageIcon} title="No files yet" description="Upload logos, hero images, project photos and brochures to reuse them anywhere on the site." />
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.items.map((asset) => (
          <div key={asset.id} className="gc-card overflow-hidden">
            <div className="flex h-32 items-center justify-center bg-muted">
              {asset.file_type === "Image" || asset.mime_type?.startsWith("image/") ? (
                <Image src={asset.file_url} alt={asset.alt_text || asset.name} className="h-full w-full" />
              ) : (
                <FileText className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1.5 p-3">
              <p className="truncate text-xs font-medium text-primary" title={asset.name}>
                {asset.name}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {asset.folder || "General"} · {asset.size ? `${Math.round(asset.size / 1024)} KB` : "—"}
              </p>
              <div className="flex items-center gap-1 pt-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard?.writeText(asset.file_url);
                    toast.success("File URL copied");
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <a href={asset.file_url} target="_blank" rel="noreferrer" className="text-[11px]">
                    Open
                  </a>
                </Button>
                <ConfirmDelete
                  title={`Delete ${asset.name}?`}
                  description="The file will be removed from the library. Pages already using it keep the old URL."
                  onConfirm={() => remove(asset)}
                >
                  <Button size="sm" variant="ghost" className="ml-auto text-destructive" disabled={user?.role !== "admin"}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </ConfirmDelete>
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.items.length > 0 && (
        <div className="gc-card mt-4">
          <Pager page={list.page} canPrev={list.canPrev} hasNext={list.hasNext} onPrev={list.prev} onNext={list.next} loading={list.loading} />
        </div>
      )}
    </div>
  );
}