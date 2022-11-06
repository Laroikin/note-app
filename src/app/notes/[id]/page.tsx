type NoteType = {
  id: string;
  title: string;
  content: string;
  created: string;
};

async function getNote(noteId: string): Promise<NoteType> {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);
  const { title, content, created } = note || {};

  const date = new Date(created).toLocaleDateString("en-US");

  return (
    <div>
      <div className="min-w-[21rem] rounded-lg bg-zinc-100 p-5 shadow-lg dark:bg-zinc-800">
        <div className="mb-5 flex items-center">
          {" "}
          <h2 className="mr-auto text-2xl font-bold capitalize text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">{date}</h2>
        </div>
        <h5>{content}</h5>
      </div>
    </div>
  );
}
