import { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

const MAX_BYTES = 8 * 1024 * 1024;

/** Image URL field with drag-and-drop upload to public website storage. */
export default function ImageField({ label, value, onChange, folder = "General", hint }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Images must be 8 MB or smaller.");
      return;
    }
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
      await base44.entities.MediaAsset.create({
        name: file.name,
        file_url,
        file_type: "Image",
        mime_type: file.type,
        size: file.size,
        folder,
        alt_text: "",
      });
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</Label>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          upload(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center ${
          dragging ? "border-accent bg-accent/5" : "border-border bg-white"
        }`}
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            <Image src={value} alt="" className="h-full w-full" fittingType="fill" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImagePlus className="h-5 w-5" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <Input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste an image URL or upload a file"
            className="h-9 text-xs"
          />
          <div className="flex items-center gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Upload className="mr-1.5 h-3.5 w-3.5" />}
              Upload
            </Button>
            {value && (
              <Button type="button" size="sm" variant="ghost" className="text-destructive" onClick={() => onChange("")}>
                <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Remove
              </Button>
            )}
            <span className="text-[11px] text-muted-foreground">{hint || "JPG, PNG, WebP, SVG · max 8 MB"}</span>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            upload(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}