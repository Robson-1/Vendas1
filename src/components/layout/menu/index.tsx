import Link from 'next/link'


export const Menu: React.FC = () => {
    return (
       <div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">Home </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="segmentos.html">Segmentos </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="obras.html">Obras </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="fornecedor.html"> Fornecedor</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="trabalhe.html"> Trabalhe Conosco </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contatos.html">Contato</a>
                        </li>
                    </ul>
                </div>
            </div>    
       </div>

    )
}