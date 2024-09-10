export default async function Dashboard() {
  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard Home</h2>
      <p className="text-muted-foreground">
        This is your protected dashboard. Only authenticated users can see this
        page.
      </p>
    </div>
  );
}
