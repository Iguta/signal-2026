const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="progress-bar">
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export default ProgressBar
