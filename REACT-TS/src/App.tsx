import {Route, Routes} from "react-router-dom"
import {Container} from "react-bootstrap"
import {ToastContainer} from "react-toastify";
import GatewayList from "./pages/Gateway/GatewayList"
import GatewayForm from "./pages/Gateway/GatewayForm"
import DeviceList from "./pages/Device/DeviceList"
import DeviceForm from "./pages/Device/DeviceForm"
import {Navbar} from "./components/Navbar"
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
            <>
                <Navbar/>
                <Container className="mb-4">
                    <ToastContainer/>
                    <Routes>
                        <Route path="/" element={<GatewayList/>}/>
                        <Route path="/gateway/create" element={<GatewayForm/>}/>
                        <Route path="/gateway/:id" element={<GatewayForm/>}/>
                        <Route path="/gateway/:id/devices" element={<DeviceList/>}/>
                        <Route path="/device/create" element={<DeviceForm/>}/>
                        <Route path="/device/:id" element={<DeviceForm/>}/>
                    </Routes>
                </Container>
            </>
    )
}

export default App
