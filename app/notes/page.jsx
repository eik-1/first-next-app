import Link from "next/link";
import PocketBase from "pocketbase";
import styles from "./Notes.module.css";
import CreateNotes from "./CreateNotes";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getNotes() {
  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getList();

  //   const res = await fetch(
  //     "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
  //     { cache: "no-store" }
  //   );
  //   const data = await res.json();
  return data?.items;
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes.map((note) => {
          return <Notes key={note.id} note={note} />;
        })}
      </div>
      <CreateNotes />
    </div>
  );
}

function Notes({ note }) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h3>{title}</h3>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
