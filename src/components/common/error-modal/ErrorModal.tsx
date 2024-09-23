import { Button } from 'primereact/button'
import './style.css'

export const ErrorModal = () => {
    return (
        <div className="error-modal">
            <div className="top">
                <img src="src/icons/error.svg"></img>
            </div>
            <div className="messege-container">
                <p className="important-messege">Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития.</p>
                <p>Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных</p>
            </div>
            <div className="error-modal-decore-line"></div>
            <Button label="Понятно" className="primary"/>
        </div>
    )
}







