import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import AuthTabs from "./components/AuthTabs";
import UserInfo from "./components/UserInfo";
import PlanoForm from "./components/PlanoForm";
import PlanoResultado from "./components/PlanoResultado";
import Mensagens from "./components/Mensagens";
import Loading from "./components/Loading";
import { API_URL } from "./config";

export default function App() {
  const [user, setUser] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [plano, setPlano] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted && session) setUser(session.user);
    })();
    return () => (mounted = false);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPlano(null);
    setMensagens([]);
  };

  return (
    <div className="container">
      <h1>🎓 Gerador de Planos de Aula com IA</h1>
      <p className="subtitle">
        Crie planos de aula personalizados alinhados à BNCC
      </p>

      <Mensagens mensagens={mensagens} />

      {user ? (
        <UserInfo user={user} onLogout={handleLogout} />
      ) : (
        <AuthTabs
          setUser={setUser}
          setMensagens={setMensagens}
          setLoading={setLoading}
        />
      )}

      {user && !plano && (
        <PlanoForm
          user={user}
          setMensagens={setMensagens}
          setLoading={setLoading}
          setPlano={setPlano}
        />
      )}

      {loading && <Loading />}

      {plano && (
        <PlanoResultado plano={plano} onVoltar={() => setPlano(null)} />
      )}
    </div>
  );
}
