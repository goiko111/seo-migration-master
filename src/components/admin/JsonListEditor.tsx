import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

interface JsonListEditorProps {
  value: string;
  onChange: (value: string) => void;
}

type ListItem = Record<string, string>;

const JsonListEditor = ({ value, onChange }: JsonListEditorProps) => {
  let items: ListItem[] | string[] = [];
  let isSimpleArray = false;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      items = parsed;
      isSimpleArray = parsed.length > 0 && typeof parsed[0] === "string";
    }
  } catch {
    return null; // Not valid JSON, don't render
  }

  const update = (newItems: typeof items) => {
    onChange(JSON.stringify(newItems, null, 2));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const arr = [...items];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= arr.length) return;
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    update(arr);
  };

  const removeItem = (index: number) => {
    update(items.filter((_, i) => i !== index));
  };

  if (isSimpleArray) {
    const simpleItems = items as string[];
    return (
      <div className="space-y-2 mt-2">
        {simpleItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col">
              <button type="button" onClick={() => moveItem(i, -1)} className="text-muted-foreground hover:text-foreground p-0.5" disabled={i === 0}>
                <ChevronUp className="w-3 h-3" />
              </button>
              <button type="button" onClick={() => moveItem(i, 1)} className="text-muted-foreground hover:text-foreground p-0.5" disabled={i === simpleItems.length - 1}>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <Input
              value={item}
              onChange={e => {
                const arr = [...simpleItems];
                arr[i] = e.target.value;
                update(arr);
              }}
              className="bg-background border-border flex-1 text-sm"
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(i)} className="shrink-0">
              <Trash2 className="w-3.5 h-3.5 text-destructive" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => update([...simpleItems, ""])}
          className="mt-1"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Añadir elemento
        </Button>
      </div>
    );
  }

  // Object array
  const objectItems = items as ListItem[];
  const keys = objectItems.length > 0 ? Object.keys(objectItems[0]) : [];

  return (
    <div className="space-y-3 mt-2">
      {objectItems.map((item, i) => (
        <div key={i} className="bg-muted/30 border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveItem(i, -1)} className="text-muted-foreground hover:text-foreground p-1" disabled={i === 0}>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => moveItem(i, 1)} className="text-muted-foreground hover:text-foreground p-1" disabled={i === objectItems.length - 1}>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(i)} className="h-7 w-7">
                <Trash2 className="w-3.5 h-3.5 text-destructive" />
              </Button>
            </div>
          </div>
          {keys.map(key => (
            <div key={key} className="flex items-start gap-2">
              <label className="text-xs text-muted-foreground w-16 shrink-0 pt-2 text-right">{key}</label>
              {item[key]?.length > 80 ? (
                <Textarea
                  value={item[key] || ""}
                  onChange={e => {
                    const arr = [...objectItems];
                    arr[i] = { ...arr[i], [key]: e.target.value };
                    update(arr);
                  }}
                  className="bg-background border-border text-sm min-h-[60px] flex-1"
                />
              ) : (
                <Input
                  value={item[key] || ""}
                  onChange={e => {
                    const arr = [...objectItems];
                    arr[i] = { ...arr[i], [key]: e.target.value };
                    update(arr);
                  }}
                  className="bg-background border-border text-sm flex-1"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          const empty: ListItem = {};
          keys.forEach(k => (empty[k] = ""));
          update([...objectItems, empty]);
        }}
        className="mt-1"
      >
        <Plus className="w-3.5 h-3.5 mr-1" /> Añadir elemento
      </Button>
    </div>
  );
};

export default JsonListEditor;
