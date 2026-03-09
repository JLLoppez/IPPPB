import Navbar from "@/app/components/ipppb/Navbar";
import Footer from "@/app/components/ipppb/Footer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="container py-5">
        <h1 className="mb-3">Login</h1>
        <p className="text-muted">
          Esta área está reservada para o portal interno. Para administrar o site, use o login do Admin.
        </p>
        <Link className="btn btn-primary" href="/admin/login">
          Ir para Admin
        </Link>
      </main>
      <Footer />
    </>
  );
}
