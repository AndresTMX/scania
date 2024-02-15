import { toast, Toaster } from "sonner";
import { supabase } from "../../supabase";
import { FaSearch } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { GrConfigure } from "react-icons/gr";
import { GrDocumentPdf } from "react-icons/gr";
import { FaArrowCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { dataFormat } from "../../helpers/datetime";
import { useRegister } from "../../Hooks/Registers";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input, Tooltip, Chip } from "@nextui-org/react";

export const users = [
  {
    key: "1",
    tracto: "4785632",
    tipo: "entrada",
    fecha: "03/02/2024",
    status: 'patio'
  },
  {
    key: "2",
    tracto: "5263843",
    tipo: "entrada",
    fecha: "02/02/2024",
    status: 'taller'
  },
  // {
  //   key: "3",
  //   name: "Jane Fisher",
  //   role: "Senior Developer",
  //   status: "Active",
  // },
  // {
  //   key: "4",
  //   name: "William Howard",
  //   role: "Community Manager",
  //   status: "Vacation",
  // },
  // {
  //   key: "5",
  //   name: "Emily Collins",
  //   role: "Marketing Manager",
  //   status: "Active",
  // },
  // {
  //   key: "6",
  //   name: "Brian Kim",
  //   role: "Product Manager",
  //   status: "Active",
  // },
  // {
  //   key: "7",
  //   name: "Laura Thompson",
  //   role: "UX Designer",
  //   status: "Active",
  // },
  // {
  //   key: "8",
  //   name: "Michael Stevens",
  //   role: "Data Analyst",
  //   status: "Paused",
  // },
  // {
  //   key: "9",
  //   name: "Sophia Nguyen",
  //   role: "Quality Assurance",
  //   status: "Active",
  // },
  // {
  //   key: "10",
  //   name: "James Wilson",
  //   role: "Front-end Developer",
  //   status: "Vacation",
  // },
  // {
  //   key: "11",
  //   name: "Ava Johnson",
  //   role: "Back-end Developer",
  //   status: "Active",
  // },
  // {
  //   key: "12",
  //   name: "Isabella Smith",
  //   role: "Graphic Designer",
  //   status: "Active",
  // },
  // {
  //   key: "13",
  //   name: "Oliver Brown",
  //   role: "Content Writer",
  //   status: "Paused",
  // },
  // {
  //   key: "14",
  //   name: "Lucas Jones",
  //   role: "Project Manager",
  //   status: "Active",
  // },
  // {
  //   key: "15",
  //   name: "Grace Davis",
  //   role: "HR Manager",
  //   status: "Active",
  // },
  // {
  //   key: "16",
  //   name: "Elijah Garcia",
  //   role: "Network Administrator",
  //   status: "Active",
  // },
  // {
  //   key: "17",
  //   name: "Emma Martinez",
  //   role: "Accountant",
  //   status: "Vacation",
  // },
  // {
  //   key: "18",
  //   name: "Benjamin Lee",
  //   role: "Operations Manager",
  //   status: "Active",
  // },
  // {
  //   key: "19",
  //   name: "Mia Hernandez",
  //   role: "Sales Manager",
  //   status: "Paused",
  // },
  // {
  //   key: "20",
  //   name: "Daniel Lewis",
  //   role: "DevOps Engineer",
  //   status: "Active",
  // },
  // {
  //   key: "21",
  //   name: "Amelia Clark",
  //   role: "Social Media Specialist",
  //   status: "Active",
  // },
  // {
  //   key: "22",
  //   name: "Jackson Walker",
  //   role: "Customer Support",
  //   status: "Active",
  // },
  // {
  //   key: "23",
  //   name: "Henry Hall",
  //   role: "Security Analyst",
  //   status: "Active",
  // },
  // {
  //   key: "24",
  //   name: "Charlotte Young",
  //   role: "PR Specialist",
  //   status: "Paused",
  // },
  // {
  //   key: "25",
  //   name: "Liam King",
  //   role: "Mobile App Developer",
  //   status: "Active",
  // },
];

export function TableInputs({ onOpen, }) {

  const { getAllRegister, data, error } = useRegister();
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const LinkToChecklistEntrada = (id, chasis, status, tipo) => {
    if (tipo === 'entrada' && status != 'pendiente') {
      toast.warning('Ya se ha realizado la revisión')
    } else {
      navigate(`checklist/${id}/${chasis}/${tipo}`)
    }
  }

  const LinkToChecklistSalida = (id, chasis, status, tipo) => {
    if (tipo === 'salida' && status === 'pendiente') {
      toast.warning('Realice el checklist de entrada primero')
    } else {
      navigate(`checklist/${id}/${chasis}/${tipo}`)
    }
  }

  const LinkToCheck = (id, chasis, status, tipo) => {
    try {
      const routes = {
        entrada: () => LinkToChecklistEntrada(id, chasis, status, tipo),
        salida: () => LinkToChecklistSalida(id, chasis, status, tipo)
      }

      if (routes[tipo]) {
        routes[tipo]()
      } else {
        throw new Error(`Error en el enrutador de checklist`)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }

  }

  const LinkToWorkshop = (id, chasis, status) => {
    if (status === 'pendiente') {
      toast.warning('Realiza el checklist de revision primero')
    } else {
      navigate(`taller/${id}/${chasis}`)
    }
  }

  const LinkToDocument = async (id, status) => {
    if (status === 'pendiente') {
      toast.warning('Realiza el checklist primero')
    } else {
      navigate(`document-checklist/${id}`)
    }
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
      event: '*',
      table: 'registros'
    },
    (payload) => {
      setUpdate(!update)
    }
  )
    .subscribe()

  useEffect(() => {
    getAllRegister();
    return () => {
      // Limpiar suscripción cuando el componente se desmonta
      changes.unsubscribe();
    };

  }, [update]);

  //RENDER COLUMNS
  const renderCell = useCallback(

    (register, columnKey) => {

      const cellValue = register[columnKey];

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
        case "ot":
          return (
            <Chip
              className="capitalize"
              color="primary"
              variant="flat"
              size="sm"
            >
              {register.ot}
            </Chip>
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

        case "origen":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold text-default-400">
                {register.origen}
              </p>
            </div>
          );

        case "created_at":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold text-default-400">
                {dataFormat(register.created_at) || 'Error en fecha'}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="enviar a taller">
                <span onClick={() => LinkToWorkshop(register.id, register.chasis, register.status)}
                  className="text-lg cursor-pointer text-default-400 active:opacity-50"
                >
                  <GrConfigure className={`text-${register.status === 'pendiente' ? 'warning' : 'primary'}`} />
                </span>
              </Tooltip>
              <Tooltip color='default' content="realizar checklist">
                <span onClick={() => LinkToCheck(register.id, register.chasis, register.status, 'entrada')}
                  className="text-lg cursor-pointer text-primary active:opacity-50"
                >
                  <GoChecklist className={`text-${register.status === 'pendiente' ? 'warning' : 'primary'}`} />
                </span>
              </Tooltip>
              <Tooltip color='default' content="ver documento">
                <span onClick={() => LinkToDocument(register.id, register.status)}
                  className="text-lg cursor-pointer text-primary active:opacity-50"
                >
                  <GrDocumentPdf className={`text-${register.status === 'pendiente' ? 'warning' : 'primary'}`} />
                </span>
              </Tooltip>
              <Tooltip color='default' content="enviar salida">
                <span onClick={() => LinkToCheck(register.id, register.chasis, register.status, 'salida')}
                  className="text-lg cursor-pointer text-primary active:opacity-50"
                >
                  <FaArrowCircleUp className={`text-${register.status === 'pendiente' ? 'default' : 'danger'}`} />
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

      <Toaster richColors position="top-center" />

      <Table
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

            <Button
              size="sm"
              className="bg-primary text-white font-semibold"
              onPress={onOpen}>
              Nuevo registro
            </Button>

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
          <TableColumn key="ot">OT</TableColumn>
          <TableColumn key="origen">ORIGEN</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
          <TableColumn key="created_at">ENTRADA</TableColumn>
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

    </>
  );
}
