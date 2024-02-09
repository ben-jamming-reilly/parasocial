export function MediaLayout() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <section className="mb-2"></section>
      <section className="flex flex-col gap-4 md:col-span-2 lg:col-span-3"></section>
    </div>
  );
}
