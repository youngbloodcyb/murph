export default async function Page() {
  return (
    <main className="h-auto p-8 lg:p-16 gap-4">
      <DataTable data={tasks} columns={columns} />
    </main>
  );
}
