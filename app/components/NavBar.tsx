import Link from "next/link";

function NavBar() {
  return (
    <nav className="flex w-full h-18 items-center justify-center p-4 space-x-4 border box-content">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/expense">Expenses</Link>
      <Link href="/category">Category</Link>
    </nav>
  );
}

export default NavBar;
