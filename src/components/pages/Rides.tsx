import RideCard from "../rides/RideCard";

export default function Rides() {
  return (
    <div className="p-4 min-h-full bg-slate-200 w-full grid grid-cols-2 items-center justify-items-center">
      <RideCard
        imageSrc="/placeholder.svg?height=80&width=80"
        timestamp="Nov 29, 1:19 AM"
        spots={3}
        onClick={() => console.log("Route clicked")}
      />
      <RideCard
        imageSrc="/placeholder.svg?height=80&width=80"
        timestamp="Nov 29, 1:19 AM"
        spots={3}
        onClick={() => console.log("Route clicked")}
      />
      <RideCard
        imageSrc="/placeholder.svg?height=80&width=80"
        timestamp="Nov 29, 1:19 AM"
        spots={3}
        onClick={() => console.log("Route clicked")}
      />
      <RideCard
        imageSrc="/placeholder.svg?height=80&width=80"
        timestamp="Nov 29, 1:19 AM"
        spots={3}
        onClick={() => console.log("Route clicked")}
      />
      <RideCard
        imageSrc="/placeholder.svg?height=80&width=80"
        timestamp="Nov 29, 1:19 AM"
        spots={3}
        onClick={() => console.log("Route clicked")}
      />
      <RideCard
        imageSrc="/placeholder.svg?height=80&width=80"
        timestamp="Nov 29, 1:19 AM"
        spots={3}
        onClick={() => console.log("Route clicked")}
      />
    </div>
  );
}
