import { ReactNode } from "react"
import { Navigate } from 'react-router-dom'

// Get Token from Local Storage
const token = localStorage.getItem("token")

type ProtectedRouteProps = {
    redirectPath?: string,
    children: ReactNode
}

const ProtectedRoute = ({
    redirectPath ="/",
    children
}: ProtectedRouteProps) => {
    if(!token){
        return <Navigate to={redirectPath} />
    }
    return children
}

export default ProtectedRoute