import { Dispatch, SetStateAction } from 'react';
import ContentText from './ContentText';

export default function TodoContent({
  notes,
  setNotes,
  isEditMode,
}: {
  notes: Array<string>;
  setNotes: Dispatch<SetStateAction<string[]>>;
  isEditMode?: boolean;
}) {
  return (
    <div>
      <ContentText notes={notes} setNotes={setNotes} isEditMode={isEditMode} />
    </div>
  );
}
