import './formCard.css';
import props from '../../types/props'

export default function FormCard( { label, children } : props ){
    return(
        <div className="form-card">
            <h2>{label}</h2>
            {children}
        </div>
    )
}