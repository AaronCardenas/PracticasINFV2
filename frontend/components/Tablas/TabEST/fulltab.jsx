import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "./utils";
import NextLink from 'next/link';
import { PDF } from "../../../api/est/solicitudes.jsx";

export default function TAB({
  columns,
  datos,
  statusOptions,
  INITIAL_VISIBLE_COLUMNS,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "fase",
    direction: "ascending",
  });
  const searchParams = useSearchParams(); 
  const router= useRouter();
  const Token = searchParams.get('token');
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(datos.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") {
      return columns;
    }
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  const filteredItems = React.useMemo(() => {
    let filtereddatos = [...datos];

    if (hasSearchFilter) {
      filtereddatos = filtereddatos.filter((user) =>
        user.rut.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filtereddatos = filtereddatos.filter((user) =>
        user.rut.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtereddatos;
  }, [datos, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    
    const handleCellClick = () => {
      // Lógica para cuando se hace click en una celda
    };
    const handleDropdownSelect = (selectedOption) => {
      switch (selectedOption) {

        case "Carta Presentacion":
        
          PDF(Token, user.rutEmpresa, user.numeroPractica);
          break;
        case "Carta Aceptacion":
          // Lógica para la opción Aceptar
          break;
        case "Eliminar":


          // Lógica para la opción Rechazar
          break;
        default:
          // Otras opciones
          break;
      }
    };
    switch (columnKey) {
      case "idSolicitud":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.idSolicitud}</p>;
      case "rut":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.rut}</p>;
      case "rutEmpresa":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.rutEmpresa}</p>;
      case "fechaSolicitud":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.fechaSolicitud.split('T')[0]}</p>;
      case "numeroPractica":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.numeroPractica}</p>;
      case "fase":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.fase}</p>;
      case "acciones":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="opciones">
                <DropdownItem onClick={() => handleDropdownSelect("Carta Presentacion")}>DW Carta Presentación</DropdownItem>
                <DropdownItem href={`est/acp?idSolicitud=${user.idSolicitud}`}>Carta de Aceptación</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect("Eliminar")}>Eliminar</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%] text-black",
              inputWrapper: "border-1 bg-gray-300",
            }}
            
            placeholder="Buscar Solicitud..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <NextLink href='est/solicitud'>
            <Button
              className="bg-black text-white "
              endContent={<PlusIcon />}
              size="l"
            >
              Nueva solicitud
            </Button>
          </NextLink>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    datos.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center mt-auto">
        <Pagination
          showControls
          color="secondary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      base: [
        "w-full",
        "h-full",
        "overflow-hidden",
        "bg-white",
        "border-3 rounded-lg",
        "text-black",
        "padding-[10px]",
        "gap-10",
      ],
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-black", "text-white", "border-b", "border-divider", "text-center", "text-md"],
      td: [
        // ...otras clases para las celdas
        "group-data-[first=true]:first:before:rounded-none border border-black ", // añade borde negro a la primera celda
        "group-data-[first=true]:last:before:rounded-none border border-black", // añade borde negro a la última celda de la primera fila
        "group-data-[middle=true]:before:rounded-none border border-black ", // añade borde negro a las celdas del medio
        "group-data-[last=true]:first:before:rounded-none border border-black", // añade borde negro a la primera celda de la última fila
        "group-data-[last=true]:last:before:rounded-none border border-black", // añade borde negro a la última celda
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Tabla"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "acciones" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No datos found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.idSolicitud}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
