import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "50px" }}>
      <h1>🏫 School Project</h1>
      <p>Welcome! Choose an option below:</p>

      <nav style={{ marginTop: "30px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}>
            <Link href="/addSchool">
              ➕ Add a New School
            </Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link href="/showSchools">
              📋 Show All Schools
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
