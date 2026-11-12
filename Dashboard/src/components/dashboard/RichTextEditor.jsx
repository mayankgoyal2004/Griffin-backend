import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const MODULES = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link", "image"],
    ["table"],
    ["clean"],
  ],
};

const FORMATS = ["header", "bold", "italic", "underline", "list", "blockquote", "link", "image", "table"];

export default function RichTextEditor({ value, onChange, placeholder }) {
  return (
    <div className="rounded-lg bg-white">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={MODULES}
        formats={FORMATS}
        placeholder={placeholder || "Write the article content…"}
      />
    </div>
  );
}