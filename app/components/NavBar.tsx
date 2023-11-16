import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full lg:w-64 bg-gray-800 text-white p-5">
      <h1 className="text-2xl mb-5">My money</h1>
      <Accordion collapsible type="single">
        <AccordionItem value="Gastos">
          <AccordionTrigger className="text-base">Gastos</AccordionTrigger>
          <AccordionContent>
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="expense/add"
            >
              Añadir
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="expense/import"
            >
              Importar
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="expense"
            >
              Listado
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Category">
          <AccordionTrigger className="text-base">Categoria</AccordionTrigger>
          <AccordionContent>
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="category/add"
            >
              Añadir
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="category"
            >
              Listado
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
