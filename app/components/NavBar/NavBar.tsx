import React from "react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="navbar bg-base-100 mb-5">
      <div className="flex-1">
        <Link href="/">
          <p className="btn btn-ghost normal-case text-xl">mymoney</p>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                <Link href="/expense">
                  <p>Expense</p>
                </Link>
              </summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link href="/expense/add">
                    <p>Add</p>
                  </Link>
                </li>
                <li>
                  <Link href="/expense/import">
                    <p>Import</p>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Category</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link href="/expense/add">
                    <p>Add</p>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
