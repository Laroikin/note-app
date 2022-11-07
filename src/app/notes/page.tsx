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
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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

  //format the date to be relative in seconds, minutes, hours, days, weeks, months, years with timezone offset
  const date = new Date(created);
  const now = new Date();
  const diff = date.getTime() - now.getTime() - now.getTimezoneOffset() * 60 * 1000;
  const diffInDays = diff / (1000 * 60 * 60 * 24);
  const diffInWeeks = diffInDays / 7;
  const diffInMonths = diffInWeeks / 4;
  const diffInYears = diffInMonths / 12;
  const formattedDate =
    diffInYears < -1
      ? formatter.format(Math.round(diffInYears), "year")
      : diffInMonths < -1
      ? formatter.format(Math.round(diffInMonths), "month")
      : diffInWeeks < -1
      ? formatter.format(Math.round(diffInWeeks), "week")
      : diffInDays < -1
      ? formatter.format(Math.round(diffInDays), "day")
      : formatter.format(Math.round(diffInDays * 24), "hour");


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
