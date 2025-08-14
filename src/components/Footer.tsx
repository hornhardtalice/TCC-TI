export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} TCC-TI. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
