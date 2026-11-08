import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import dummyData from "../dummyData";

const Main = () => {
  const [data, setData] = useState(dummyData);
  
  return (
    <DragDropContext>
        <div className="trello">
            {data.map((section) => (
                <Droppable key={section.id} droppableId={section.id}>
                </Droppable>
            ))}
        </div>
    </DragDropContext>
  )
};

export default Main;