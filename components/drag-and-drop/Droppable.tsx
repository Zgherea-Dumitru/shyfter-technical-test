import { useDroppable } from '@dnd-kit/core';

export default (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: props.data
  });

  return (
    <div ref={setNodeRef} className={props.className} >
      {props.children}
    </div>
  );
}