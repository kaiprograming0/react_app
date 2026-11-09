
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dummyData from "../dummyData";
import Card from "./Card";

const Main = () => {
  const [data, setData] = useState(dummyData);

  // ドラッグ終了時の処理
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // ドロップ先がない場合は何もしない
    if (!destination) return;

    // 移動元と移動先のセクションを取得
    const sourceSection = data.find(
      (section) => section.id === source.droppableId
    );

    const destinationSection = data.find(
      (section) => section.id === destination.droppableId
    );

    // データをコピー
    const newData = data.map((section) => ({
      ...section,
      tasks: [...section.tasks],
    }));

    const sourceTasks = newData.find(
      (section) => section.id === source.droppableId
    ).tasks;

    const destinationTasks = newData.find(
      (section) => section.id === destination.droppableId
    ).tasks;

    // 移動するカードを取り出す
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // 移動先にカードを挿入する
    destinationTasks.splice(destination.index, 0, movedTask);

    // Stateを更新
    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable
            key={section.id}
            droppableId={section.id}
          >
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">
                  {section.title}
                </div>

                <div className="trello-section-content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.3 : 1,
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;