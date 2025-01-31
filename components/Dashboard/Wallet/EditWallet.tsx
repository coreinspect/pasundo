interface EditWalletProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditWallet = ({ isOpen, onClose }: EditWalletProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit User Wallet</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        {/* Add edit wallet form implementation */}
      </div>
    </div>
  );
};

export default EditWallet;
