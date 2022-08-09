import { Produto } from "app/models/produtos"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useState } from 'react'
import { Button } from 'primereact/button'
import Router from 'next/router'
import { confirmDialog } from 'primereact/confirmdialog'

interface TabelaProdutosProps {
    produtos: Array<Produto>
    onEdit: (produto) => void
    onDelete: (produto) => void
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onEdit,
    onDelete
}) => {

    const actionTemplate = (registro: Produto) => {
        const url = `/cadastros/produtos?id=${registro.id}`
        return (
            <div>
                <Button label="Editar" 
                        className="p-button-rounded p-button-info"
                        onClick={e => Router.push(url) }
                        />
                <Button label="Deletar" 
                    className="p-button-rounded p-button-danger"
                    onClick={event => {
                    confirmDialog({
                        message: "Confirma a exclusão deste registro?",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        accept: () => onDelete(registro),
                        header: "Confirmação"
                    })
                }}
                 />     
            </div>
        )
    }

    return (
        <DataTable value={produtos} paginator rows={5}>
            <Column field="id" header="Código"/>
            <Column field="sku" header="Sku"/>
            <Column field="nome" header="Nome"/>
            <Column field="preco" header="Preço"/>
            <Column header="" body={actionTemplate}/>
        </DataTable>

        
    )
}
