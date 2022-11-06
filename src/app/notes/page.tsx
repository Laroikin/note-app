import Link from "next/link";
import CreateNote from "./CreateNote";

type NoteType = {
  id: string;
  title: string;
  content: string;
  created: string;
};

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?perPage=100",
    { cache: "no-cache" }
  );
  const data = await res.json();
  return data?.items as NoteType[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className="grid xl:grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-2">
        {notes
          .sort((a, b) => {
            return (
              new Date(b.created).getTime() - new Date(a.created).getTime()
            );
          })
          .map((note) => (
            <Note note={note} key={note.created} />
          ))}
        <CreateNote />
      </div>
    </div>
  );
}

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  const { id, title, content, created } = note || {};

  const formatter = new Intl.RelativeTimeFormat("en", {
    style: "short",
    numeric: "auto",
    
  });

  const date = new Date(created);
  const now = new Date();
  const diff = now.getTime() - date.getTime() - 32400000;
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  let formattedDate = formatter.format(diffInSeconds, "second");

  if (diffInSeconds >= 60) {
    formattedDate = formatter.format(diffInMinutes, "minute");
  }
  if (diffInMinutes >= 60) {
    formattedDate = formatter.format(diffInHours, "hour");
  }
  if (diffInHours >= 24) {
    formattedDate = formatter.format(diffInDays, "day");
  }
  if (diffInDays >= 7) {
    formattedDate = formatter.format(diffInWeeks, "week");
  }
  if (diffInDays >= 30) {
    formattedDate = formatter.format(diffInMonths, "month");
  }
  if (diffInDays >= 365) {
    formattedDate = formatter.format(diffInYears, "year");
  }

  return (
    <Link href={`/notes/${id}`}>
      <div className="min-h-[132px] w-full rounded-lg bg-zinc-100 p-5 shadow-sm dark:bg-zinc-800 dark:shadow-md">
        <div className="mb-3 flex items-center">
          {" "}
          <h2 className="mr-auto w-[70%] break-words text-2xl font-bold capitalize text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </h2>
        </div>
        <h5 className="break-words">{content}</h5>
      </div>
    </Link>
  );
}
