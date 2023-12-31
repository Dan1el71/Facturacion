import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const SideBar = () => {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const menuOptions = [
    {
      name: 'Clientes',
      path: '/clientes',
      icon: 'bi bi-people',
      rol: 2,
    },
    {
      name: 'Productos',
      path: '/productos',
      icon: 'bi bi-bag',
      rol: 1,
    },
    {
      name: 'Usuarios',
      path: '/usuarios',
      icon: 'bi bi-person',
      rol: 1,
    },
    {
      name: 'Facturacion',
      path: '/facturacion',
      icon: 'bi bi-file-earmark-text',
      rol: 2,
    },
    {
      name: 'Reportes',
      path: '/reportes',
      icon: 'bi bi-file-earmark-bar-graph',
      rol: 1,
    },
  ]
  /* 
    1: Administrador 2: Cajero 3: No tiene rol
  */
  const userRole = useAuthStore((state) => state.profile?.role || 3)

  const filteredOptions = menuOptions.filter((option) => option.rol >= userRole)

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    navigate('/login')
    logout()
  }

  return (
    <div className="bg-[#010409] w-72 h-screen " style={{ minWidth: '288px' }}>
      <h1 className="text-center font-semibold text-xl py-5">Facturacion</h1>
      <ul className="mt-6">
        {filteredOptions.map((option) => (
          <li key={option.name}>
            <Link
              to={option.path}
              className="flex items-center px-4 mx-2 my-2 py-2 hover:bg-[#171B20] rounded-md"
            >
              <i className={`${option.icon} mr-3`}></i>
              {option.name}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleClick}
            className="flex items-center px-4 py-2 mx-2 hover:bg-[#171B20] rounded-md fixed bottom-2"
          >
            <i className="bi bi-box-arrow-right mr-3"></i>
            Cerrar sesion
          </button>
        </li>
      </ul>
    </div>
  )
}
export default SideBar
