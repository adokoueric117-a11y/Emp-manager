import { useEffect, useState } from "react"

export default function App() {

  interface Employee {
    id: number,
    name: string,
    Email: string,
    departement: string,
    poste: string,
    salaire: string
  }

  const [employee, setEmployee] = useState<Employee[]>([])
  const [SearchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true) // Mis à true par défaut pour le chargement
  const [Error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://emp-manager-d4sl.onrender.com/api/employees/")
      .then(res => res.json())
      .then(data => setEmployee(data))
      .catch(() => setError("Erreur serveur"))
      .finally(() => setLoading(false))
  }, [])

  const filteredemployee = employee.filter(emp =>
    emp.name.toLocaleLowerCase().includes(SearchTerm.toLocaleLowerCase()) ||
    emp.poste.toLocaleLowerCase().includes(SearchTerm.toLocaleLowerCase())
  )

  if (loading) return <p className="text-center p-10">Chargement...</p>
  if (Error) return <p className="text-center p-10 text-red-500">{Error}</p>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-center p-6 md:p-10 font-bold">
        EMP <span className="text-blue-800">MANAGER</span>
      </h1>

      {/* Barre de recherche responsive */}
      <div className="mb-8 flex items-center justify-center">
        <input
          type="text"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un nom, ou poste"
          className="border w-full max-w-md px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
        />
      </div>

      {/* Conteneur de table avec scroll horizontal sur mobile */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <table className="w-full text-left border-collapse min-w-150">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
              <th className="px-4 py-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Poste</th>
              <th className="px-4 py-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Département</th>
              <th className="px-4 py-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-4 py-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Salaire</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredemployee.map((emp) => (
              <tr key={emp.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-4 text-sm text-gray-800 font-medium">{emp.name}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{emp.poste}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{emp.departement}</td>
                <td className="px-4 py-4 text-blue-600 underline text-xs md:text-sm break-all">
                  {emp.Email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 font-mono text-right whitespace-nowrap">
                  {emp.salaire} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredemployee.length === 0 && (
          <p className="text-center p-10 text-gray-500">Aucun employé trouvé.</p>
        )}
      </div>
    </div>
  )
}
