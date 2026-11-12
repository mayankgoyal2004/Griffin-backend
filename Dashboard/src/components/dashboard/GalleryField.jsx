import ImageField from "@/components/dashboard/ImageField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function GalleryField({ label = "Gallery", images = [], onChange, folder = "General" }) {
  const update = (index, value) => {
    if (!value) {
      onChange(images.filter((_, i) => i !== index));
      return;
    }
    onChange(images.map((url, i) => (i === index ? value : url)));
  };

  return (
    <div>
      <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</Label>
      <div className="space-y-3">
        {images.map((url, index) => (
          <ImageField
            key={index}
            label={`${label} image ${index + 1}`}
            value={url}
            folder={folder}
            onChange={(value) => update(index, value)}
          />
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => onChange([...images, ""])}>
        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add image
      </Button>
    </div>
  );
}