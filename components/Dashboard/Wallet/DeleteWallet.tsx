interface DeleteWalletProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteWallet = ({ isOpen, onClose }: DeleteWalletProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Delete User Wallet</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        {/* Add delete wallet confirmation implementation */}
      </div>
    </div>
  );
};

export default DeleteWallet;
