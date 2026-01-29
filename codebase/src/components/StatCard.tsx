type StatCardProps = {
  label: string
  value: string
  meta: string
}

const StatCard = ({ label, value, meta }: StatCardProps) => {
  return (
    <article className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-meta">{meta}</p>
    </article>
  )
}

export default StatCard
