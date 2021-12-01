import * as React from "react"
import { DataGrid } from "@material-ui/data-grid"

function loadServerRows(page, data, rowsPerPage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.rows.slice((page - 1) * rowsPerPage, page * rowsPerPage))
    }, Math.random() * 500 + 100) // simulate network latency
  })
}

export default function ServerPaginationGrid() {
  const data = {
    rows: [
      {
        _id: 1,
        name: "Douglas Adams",
        email: "douglas@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "England",
      },
      {
        _id: 2,
        name: "hamza Adams",
        email: "douglas@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "England",
      },
      {
        _id: 3,
        name: "hamza ali",
        email: "douglas@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "England",
      },
      {
        _id: 4,
        name: "hamza ali",
        email: "asdf@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "England",
      },
      {
        _id: 5,
        name: "hamza ali",
        email: "sasasf@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "England",
      },
      {
        _id: 6,
        name: "hamidasdfdsaf",
        email: "douglas@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "bahawalpur",
      },
      {
        _id: 7,
        name: "ali ahmeasdd",
        email: "douglas@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "bahawalpur",
      },
      {
        _id: 8,
        name: "google",
        email: "douglas@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "bahawalpur",
      },
      {
        _id: 9,
        name: "ali",
        email: "asdf@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "bahawalpur",
      },
      {
        _id: 10,
        name: "safari",
        email: "sasasf@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "bahawalpur",
      },
      {
        _id: 11,
        name: "safari",
        email: "sasasf@gmail.com",
        phoneNumber: "07428233312",
        city: "London",
        country: "bahawalpur",
      },
    ],
  }
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 140,
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      width: 140,
    },
    {
      field: "city",
      headerName: "city",
      width: 140,
    },
    {
      field: "country",
      headerName: "country",
      width: 140,
    },
  ]

  const [page, setPage] = React.useState(1)
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handlePageChange = (params) => {
    setPage(params + 1)
  }
  const handleChangeRowsPerPage = (num) => {
    setRowsPerPage(num)
  }
  React.useEffect(() => {
    const func = async () => {
      setLoading(true)
      const newRows = await loadServerRows(page, data, rowsPerPage)
      setRows(newRows)
      setLoading(false)
    }
    func()
  }, [page, rowsPerPage])
  console.log(rows)
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        pageSize={10}
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pagination
        onPageSizeChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        rowCount={data.rows.length}
        page={page - 1}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  )
}
