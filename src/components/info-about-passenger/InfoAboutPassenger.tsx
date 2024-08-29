import { Button } from "primereact/button"
import { useState } from "react";
import 'primeicons/primeicons.css';
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from 'primereact/checkbox';
import './style.css'

function InfoAboutPassenger() {
    const [expanded, setExpanded] = useState(false);
    const [selectedGenderType, setSelectedgenderType] = useState('adult');
    const [selectedDocumentTypes, setSelectedDocumentTypes] = useState('passport')
    const [selectedGender, setSelectedGender] = useState(null);
    const [isCheckedMobility, setIsCheckedMobility] = useState(false);
    const [documentNumber, setDocumentNumber] = useState('');
    const [documentSeries, setDocumentSeries] = useState('');

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const documentTypes = [
        { label: 'Паспорт', value: 'passport' },
        { label: 'Свидетельство о рождении', value: 'birth_certificate' }
    ];
    const genderType = [
        { label: 'Взрослый', value: 'adult' },
        { label: 'Ребенок', value: 'kid' }
    ];

    const handleButtonClick = (gender) => {
        setSelectedGender(gender);
    };

    const handleLimitedMobility = (e) => {
        setIsCheckedMobility(e.checked);
    };

    // Функция для генерации маски черточек
    const getMask = (length) => Array(length).fill('-').join('');

    return (
        <div className="info-passanger-container" style={{ marginBottom: '1em' }}>
            <div className="header-info-passanger-container">
                <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'flex-start', cursor: 'pointer' }} onClick={toggleExpansion}>
                    <Button
                        icon={expanded ? 'pi pi-minus' : 'pi pi-plus'}
                        className="p-button p-button-text"
                        style={{
                            color: "#928F94", borderColor: "#928F94", borderRadius: "50%", width: "32px", height: "32px", top: "13px", right: "0"
                        }} />
                    <h3 style={{ marginLeft: "15px" }}>Пассажир 1</h3>
                </div>
                <Button icon="pi pi-times" rounded text severity="secondary" style={{ top: "-1px", left: "739px" }} />
            </div>

            {expanded && (
                <Panel className="info-passanger-form">
                    <div className="p-field">
                        <Dropdown
                            id="genderType"
                            className="gender"
                            options={genderType}
                            value={selectedGenderType}
                            onChange={(e) => setSelectedgenderType(e.value)}
                        />
                    </div>
                    <div className="p-field all-name-container">
                        <div className="p-field">
                            <label htmlFor="lastName" style={{ fontSize: "16px", color: "#928F94" }}>Фамилия</label>
                            <InputText className="name" id="lastName" placeholder="Фамилия" style={{ fontSize: "24px", color: "#292929" }} />
                        </div>

                        <div className="p-field" style={{ marginLeft: "25px" }}>
                            <label htmlFor="firstName" style={{ fontSize: "16px", color: "#928F94" }}>Имя</label>
                            <InputText className="name" id="firstName" placeholder="Имя" style={{ fontSize: "24px", color: "#292929" }} />
                        </div>

                        <div className="p-field" style={{ marginLeft: "25px" }}>
                            <label htmlFor="middleName" style={{ fontSize: "16px", color: "#928F94" }}>Отчество</label>
                            <InputText className="name" id="middleName" placeholder="Отчество" style={{ fontSize: "24px", color: "#292929" }} />
                        </div>
                    </div>
                    <div className="gender-birthday-container">
                        <div className="gender-container">
                            <span style={{ fontSize: "16px", color: "#928F94" }} className="header-gender">Пол</span>
                            <div className="btn-gender-container">
                                <button
                                    className={`gender-button ${selectedGender === 'male' ? 'selected' : ''}`}
                                    onClick={() => handleButtonClick('male')}
                                >
                                    М
                                </button>
                                <button
                                    className={`gender-button ${selectedGender === 'female' ? 'selected' : ''}`}
                                    onClick={() => handleButtonClick('female')}
                                >
                                    Ж
                                </button>
                            </div>
                        </div>
                        <div style={{ marginLeft: "25px", marginTop: "5px" }} className="p-field birthday-container">
                            <label htmlFor="dob" style={{ fontSize: "16px", color: "#928F94" }}>Дата рождения</label>
                            <Calendar className="birthday" id="dob" placeholder="Выберите дату рождения" />
                        </div>
                    </div>

                    <div className="flex limited-mobility-container">
                        <Checkbox inputId="limited-mobility" value="limited-mobility"
                            onChange={handleLimitedMobility}
                            checked={isCheckedMobility}
                        />
                        <label style={{ marginLeft: "15px" }} className="ml-2">Ограниченная подвижность</label>
                    </div>
                    <div className="about-documents-container">
                        <div className="p-field">
                            <label htmlFor="documentType" style={{ fontSize: "16px", color: "#928F94" }}>Тип документа</label>
                            <Dropdown
                                id="documentType"
                                className="document"
                                options={documentTypes}
                                value={selectedDocumentTypes}
                                onChange={(e) => setSelectedDocumentTypes(e.value)}
                            />
                        </div>
                        {selectedDocumentTypes === 'passport' && (
                            <>
                                <div className="p-field" style={{ marginLeft: "25px" }}>
                                    <label htmlFor="documentSeries" style={{ fontSize: "16px", color: "#928F94" }}>Серия документа</label>
                                    <InputText
                                        className="document-series input-with-mask "
                                        id="documentSeries"
                                        placeholder={getMask(4)}
                                        value={documentSeries}
                                        onChange={(e) => setDocumentSeries(e.target.value)}
                                    />
                                </div>
                                <div className="p-field" style={{ marginLeft: "25px" }}>
                                    <label htmlFor="documentNumber" style={{ fontSize: "16px", color: "#928F94" }}>Номер документа</label>
                                    <InputText
                                        className="document-number input-with-mask "
                                        id="documentNumber"
                                        placeholder={getMask(6)}
                                        value={documentNumber}
                                        onChange={(e) => setDocumentNumber(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        {selectedDocumentTypes === 'birth_certificate' && (
                            <div className="p-field" style={{ marginLeft: "25px" }}>
                                <label htmlFor="documentNumber" style={{ fontSize: "16px", color: "#928F94" }}>Номер документа</label>
                                <InputText
                                    className="document-number input-with-mask "
                                    id="documentNumber"
                                    placeholder={getMask(12)}
                                    value={documentNumber}
                                    onChange={(e) => setDocumentNumber(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    < div className="next-passenger-container">
                        <Button style={{}} className='primary next-passenger' label='Следующий пассажир' />
                    </div>
                </Panel>
            )}
        </div>
    )
}

export default InfoAboutPassenger;
