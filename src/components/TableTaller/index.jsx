import { supabase } from "../../supabase";
import { FaSearch } from "react-icons/fa";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";
import { dataFormat } from "../../helpers/datetime";
import { useRegister } from "../../Hooks/Registers";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input, Tooltip, Chip } from "@nextui-org/react";
import { ModalResponsive } from "../../outlets/ModalResponsive";

export function TableTaller() {

  const { gerRegistersTaller, data, error } = useRegister();
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [idResonsiva, setResponsive] = useState('')
  const [modal, setModal] = useState(false);


  const openResponsive = (idResponsiva) => {
    setResponsive(idResponsiva)
    setModal(!modal)
  }

  const routerColor = (color) => {
    const routes = {
      pendiente: 'warning',
      revisado: 'primary',
      taller: 'danger',
      finalizado: 'default'
    }

    if (routes[color]) {
      return routes[color]
    } else {
      return 'default'
    }
  }

  const changes = supabase.channel('schema-db-changes').on(
    'postgres_changes',
    {
      schema: 'public',
      event: 'UPDATE',
      table: 'registros'
    },
    (payload) => {
      setUpdate(!update)
    }
  )
    .subscribe()

  useEffect(() => {
    gerRegistersTaller();
    return () => {
      // Limpiar suscripción cuando el componente se desmonta
      changes.unsubscribe();
    };

  }, [update]);

  //RENDER COLUMNS
  const renderCell = useCallback(

    (register, columnKey) => {

      const cellValue = register[columnKey];
      const { comentarios, created_at, llaves, id } = register['responsivas'][0] || {};

      switch (columnKey) {
        case "chasis":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold text-default-400">
                {register.chasis}
              </p>
            </div>
          );
        case "tipo":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold">{register.tipo}</p>
            </div>
          );
        case "modelo":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold text-default-400">
                {register.modelo}
              </p>
            </div>
          );
        case "created_at":
          return (
            <Chip
              className="capitalize"
              color="primary"
              variant="flat"
              size="sm"
            >
              {dataFormat(created_at)}
            </Chip>
          );

        case "llaves":
          return (
            <div className="flex flex-row gap-1 flex-wrap">
              {llaves.map((key) => (
                <Chip size="sm" variant='faded' color="primary" className="text-xs ">
                  {key}
                </Chip>
              ))}
            </div>
          );

        case "status":
          return (
            <Chip
              className="capitalize"
              color={routerColor(register.status)}
              variant="flat"
              size="sm"
            >
              {register.status}
            </Chip>
          );

        case "destino":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold text-default-400">
                {register.destino}
              </p>
            </div>
          );

        case "checkOut":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold text-default-400">
                {dataFormat(register.checkOut) || 'Error en fecha'}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color='default' content="reparar">
                <span
                  className="text-lg cursor-pointer text-primary active:opacity-50"
                >
                  <MdOutlineTireRepair />
                </span>
              </Tooltip>
              <Tooltip color='default' content="ver responsiva">
                <span
                  onClick={() => openResponsive(id)}
                  className="text-lg cursor-pointer text-primary active:opacity-50"
                >
                  <BsFiletypePdf />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [update]
  );

  const rowsPerPage = 5;
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <>
      <Table
        className="min-w-[720px]"
        aria-label="Example table with client side pagination"
        topContent={
          <div className="flex flex-row items-center w-full justify-start gap-4 ">

            <Input
              className="w-52"
              size="sm"
              type="text"
              placeholder="Buscar registros"
              endContent={<FaSearch />}
            />

          </div>
        }
        bottomContent={
          <div className="flex w-full justify-center text-white">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="chasis">CHASIS</TableColumn>
          <TableColumn key="tipo">TIPO</TableColumn>
          <TableColumn key="modelo">MODELO</TableColumn>
          <TableColumn key="created_at">INGRESO</TableColumn>
          <TableColumn key="llaves">LLAVES</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
          <TableColumn key="actions">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Sin salidas registradas"}
          items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalResponsive modal={modal} setModal={setModal} idResponsiva={idResonsiva} />
    </>
  );
}
