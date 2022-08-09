import { useState, useEffect } from 'react'
import { Layout, Input, InputMoney,  Message } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal, formatReal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const msgcampoObrigatorio = 'Campo obrigatório'

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgcampoObrigatorio),
    descricao: yup.string().trim().required(msgcampoObrigatorio),
    preco: yup.number().required(msgcampoObrigatorio).moreThan(0, 'Valor tem que ser maior que zero (0,00)'),
    nome: yup.string().trim().required(msgcampoObrigatorio)
})

interface FormErrors {
    sku?: string
    descricao?: string
    preco?: string
    nome?: string
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [cadastro, setCadastro] = useState<string>('')
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const router = useRouter()
    const { id: queryId } = router.query

    console.log(queryId)

    useEffect(() => {
        if (queryId) {
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco(formatReal(`${produtoEncontrado.preco}`))
                setCadastro(produtoEncontrado.cadastro || '')
            })

        }

    }, [queryId])

    //(query) retorna dados da url
    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao,
            cadastro
        }
         console.log(produto)

        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if (id) {
                service
                    .atualizar(produto)
                    .then(response => {
                        setMessages([{
                            tipo: 'success', texto: 'Produto atualizado com sucesso!'
                        }])
                    })
            } else {

                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setCadastro(produtoResposta.cadastro)
                        setMessages([{
                            tipo: 'success', texto: 'Produto Salvo com sucesso!'
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path
            const message = err.message

            setErrors({
                [field]: message
            })
        })


    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>

            {id &&
                <div className="columns">
                    <Input label="Código:"
                        columnClasses="is-half"
                        value={id}
                        id="inputId"
                        disabled={true}
                    />

                    <Input label="Data Cadastro:"
                        columnClasses="is-half"
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled
                    />
                </div>
            }

            <div className="columns">
                <Input label="SKU: *"
                    columnClasses="is-half"
                    autoComplete="off" 
                    onChange={e => setSku(e.target.value)}
                    value={sku}
                    id="inputSku"
                    placeholder="Digite o SKU do produto"
                    error={errors.sku}

                />

                <InputMoney label="Preço: *"
                    columnClasses="is-half"
                    autoComplete="off" 
                    onChange={e => setPreco(e.target.value)}
                    value={preco}
                    id="inputPreco"
                    placeholder="Digite o Preço do produto"
                    maxLength={16}
                    error={errors.preco}
                />
            </div>

            <div className="columns">
                <Input label="Nome: *"
                    columnClasses="is-full"
                    autoComplete="off" 
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    error={errors.nome}
                />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            id="inputDesc" value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Digite a Descrição detalhada do produto"
                        />
                        {errors.descricao &&
                            <p className='help is-danger' > {errors.descricao} </p>
                        }

                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button">Voltar</button>
                    </Link>

                </div>
            </div>

        </Layout>
    )
}