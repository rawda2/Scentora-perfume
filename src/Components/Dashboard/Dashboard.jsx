
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Alert,
  List,
  
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import './Dashboard.css'
import { useState,useCallback,useEffect } from "react";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";


const API_BASE_URL = "http://localhost:3000/products";
const ORDERS_API_URL = "http://localhost:3000/orders"; // adjust to your API


function ProductsPageContent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    imageUrl: '',
    size: '',
    stock: '',
    gender: '',
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setRows(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, productForm);
        setSuccess("Product updated successfully");
      } else {
        await axios.post(API_BASE_URL, productForm);
        setSuccess("Product added successfully");
      }
      await fetchProducts();
      setProductForm({
        name: '',
        price: '',
        imageUrl: '',
        size: '',
        stock: '',
        gender: '',
      });
      setEditingId(null);
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Failed to submit the form.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductForm(product);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setProductForm({
      name: '',
      price: '',
      imageUrl: '',
      size: '',
      stock: '',
      gender: '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setSuccess("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Delete Error:", err);
      setError("Failed to delete product.");
    } finally {
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" color="success" onClick={() => handleEdit(params.row)}><EditIcon /></Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}><DeleteIcon /></Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ px: 2, py: 4 }}>
        <h5 className="h2 mb-3">{editingId ? 'Edit Product' : 'Add Product'}</h5>
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ my: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField name="name" label="Name" value={productForm.name} onChange={handleInputChange} required />
              <TextField name="price" label="Price" type="number" value={productForm.price} onChange={handleInputChange} required />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField name="size" label="Size" value={productForm.size} onChange={handleInputChange} required />
              <TextField name="stock" label="Stock" type="number" value={productForm.stock} onChange={handleInputChange} required />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField name="gender" className="" label="Gender" value={productForm.gender} onChange={handleInputChange} required />
              <TextField name="imageUrl" label="Image URL" value={productForm.imageUrl} onChange={handleInputChange} required />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" className={editingId ? 'bg-warning' : 'btn'}  disabled={loading}>
                {editingId ? 'Update' : 'Add'} Product
              </Button>
              {editingId && <Button  className=" outlined i"  onClick={handleCancelEdit}>Cancel</Button>}
            </Stack>
          </Stack>
        </Box>

        <Typography variant="h6" gutterBottom>Product List</Typography>
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </>
  );
}

function OrdersPageContent() {
 const [orders, setOrders] = useState([]);
 const [status,setStatus]=useState("")
 const [success, setSuccess] = useState(null);
const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ORDERS_API_URL);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 

const columns = [
  {
    field: "id",
    headerName: "Order ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "productIds",
    headerName: "Products",
    flex: 1,
renderCell: (params) => Array.isArray(params.value) ? params.value.join(", ") : "No Products",
  },
  {
    field: "total",
    headerName: "Total ($)",
    flex: 1},
    
 {
  field: "status",
  headerName: "Status",
  flex: 2,
  renderCell: (params) => {
  const handleChange = async (e) => {
  const newStatus = e.target.value;
  const updatedOrders = orders.map((order) =>
    order.id === params.row.id ? { ...order, status: newStatus } : order
  );
  setOrders(updatedOrders);

  try {
    await axios.put(`${ORDERS_API_URL}/${params.row.id}`, {
      ...params.row,
      status: newStatus,
    });
    setSuccess(`Order ${params.row.id} status updated to "${newStatus}"`);
    setTimeout(() => setSuccess(null), 3000);
  } catch (error) {
    setError("Failed to update status.");
    setTimeout(() => setError(null), 3000);
    console.error("Failed to update status:", error);
  }
};


    return (
     <Select
  value={(params.value?params.value:"Processing")}
  onChange={handleChange}
  size="small"
  disableUnderline
  variant="standard"
  sx={{
    fontWeight: "bold",
    border: "none",
    backgroundColor: "transparent",
    color:
      params.value === "shipped"
        ? "green"
        : params.value === "processing"
        ? "orange" // MUI warning color
        : "red", // cancelled
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    '& .MuiSelect-icon': {
      color:
        params.value === "shipped"
          ? "green"
          : params.value === "processing"
          ? "#ed6c02"
          : "red",
    },
  }}
>
  <MenuItem value="processing" sx={{ color: "#ed6c02" }}>Processing</MenuItem>
  <MenuItem value="shipped" sx={{ color: "green" }}>Shipped</MenuItem>
  <MenuItem value="cancelled" sx={{ color: "red" }}>Cancelled</MenuItem>
</Select>

    );
  },
}
,
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
];


  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Orders Overview
      </Typography>

      <Box sx={{ height: 400, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
        {success && <Alert severity="success" sx={{ my: 2 }}>{success}</Alert>}
{error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

        <DataGrid
          rows={orders}
          columns={columns}
          loading={loading}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            "& .MuiDataGrid-cell": { py: 1.5 },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#fafafa",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#9c6f6f",
              color: "#000",
              fontWeight: "bold",
            },
            border: "none",
          }}
        />
      </Box>
    </Box>
  );
}



function Dashboard() {
  const [selectedSegment, setSelectedSegment] = useState("dash");

  return (
    <>
     <div className="main d-flex bg-light" >

        <Box className=" bg-light mt-5" sx={{ width: 250,height:"100%", padding: 2 }}>
          <h2 className=" h2">Dashboard </h2>
      <List className=" d-flex flex-column mt-5 gap-3">
         <Link onClick={()=>setSelectedSegment("dash")} className=" text-decoration-none i" ><DashboardIcon/> Products Manegment</Link>
         <Link onClick={()=>setSelectedSegment("orders")} className=" text-decoration-none i" ><ShoppingCartIcon/> Orders</Link>

      </List>
    </Box>
            <Box sx={{ width: 1100,height:"100%", bgcolor: "#f4f4f4", padding: 2 }}>

       {(selectedSegment=="dash"?<ProductsPageContent/>:<OrdersPageContent/>)}
       </Box>
     </div>
   
    </>
  );
}


export default Dashboard;
