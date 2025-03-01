
export const AlerteMessage = ({ message, alerte }) => {
    return (
        <div className={`alerte-message ${alerte}`}>
            {message}
        </div>
    );
}