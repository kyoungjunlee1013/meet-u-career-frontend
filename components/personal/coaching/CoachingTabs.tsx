"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoachingSectionEditor } from "./CoachingSectionEditor";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export interface CoachingSection {
  sectionKey: string;
  sectionTitle: string;
  content: string;
  feedback?: string;
  revisedContent?: string;
}

const DEMO_SECTIONS: CoachingSection[] = [
  { sectionKey: "growth", sectionTitle: "성장 과정", content: "" },
  { sectionKey: "motivation", sectionTitle: "지원 동기", content: "" },
];

export function CoachingTabs() {
  const [sections, setSections] = useState<CoachingSection[]>(DEMO_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].sectionKey);
  const { toast } = useToast();

  // 드래그 앤 드롭 순서 변경 핸들러
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(sections);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSections(reordered);
    // 순서 변경 후 활성 탭도 유지
    if (removed.sectionKey === activeSectionId) {
      setActiveSectionId(removed.sectionKey);
    }
  };

  // 탭 삭제 핸들러 (최소 1개 남기기)
  const handleDeleteTab = (sectionKey: string) => {
    if (sections.length === 1) {
      toast({ title: "최소 1개 항목은 남겨야 합니다.", variant: "destructive" });
      return;
    }
    toast({
      title: "정말 삭제하시겠습니까?",
      description: "삭제하면 복구할 수 없습니다.",
      action: (
        <ToastAction
          altText="삭제"
          onClick={() => {
            setSections(prev => {
              const filtered = prev.filter(s => s.sectionKey !== sectionKey);
              if (activeSectionId === sectionKey && filtered.length > 0) {
                setActiveSectionId(filtered[0].sectionKey);
              }
              return filtered;
            });
          }}
        >
          삭제
        </ToastAction>
      ),
      variant: "destructive",
    });
  };

  return (
    <Tabs value={activeSectionId} onValueChange={setActiveSectionId} className="w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tabs" direction="horizontal">
          {(provided) => (
            <TabsList
              className="flex gap-2 border-b bg-transparent rounded-none shadow-none p-0"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sections.map((section, idx) => (
                <Draggable key={section.sectionKey} draggableId={section.sectionKey} index={idx}>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className="flex items-center mr-1"
                      style={{ opacity: snapshot.isDragging ? 0.7 : 1 }}
                    >
                      {/* Grip (드래그 핸들) */}
                      <span {...dragProvided.dragHandleProps} className="cursor-grab pr-1 flex items-center text-gray-400 hover:text-blue-500">
                        <GripVertical className="w-4 h-4" />
                      </span>
                      {/* 탭 버튼 */}
                      <TabsTrigger
                        value={section.sectionKey}
                        className={`px-6 py-2 text-sm font-medium border-b-2 transition-colors bg-transparent rounded-none shadow-none
                          data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-50
                          data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 hover:data-[state=inactive]:text-blue-600
                        `}
                      >
                        {section.sectionTitle}
                      </TabsTrigger>
                      {/* X버튼 (삭제) */}
                      <button
                        type="button"
                        className="ml-1 px-1 py-0.5 text-xs rounded text-gray-400 hover:text-red-500 transition"
                        onClick={() => handleDeleteTab(section.sectionKey)}
                        tabIndex={-1}
                        style={{ lineHeight: 0 }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* + 버튼은 별도 스타일로 */}
              <button
                type="button"
                className="ml-2 px-2 py-1 text-base rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                +
              </button>
              {provided.placeholder}
            </TabsList>
          )}
        </Droppable>
      </DragDropContext>
      {sections.map((section) => (
        <TabsContent key={section.sectionKey} value={section.sectionKey}>
          <CoachingSectionEditor
            section={section}
            onContentChange={(val) => {
              setSections((prev) => prev.map((s) => s.sectionKey === section.sectionKey ? { ...s, content: val } : s));
            }}
            onAIFeedback={() => {}}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
