type ProfileHeaderProps = {
  author: string;
  backHref: string;
};

export function ImageLabel({ author, backHref }: ProfileHeaderProps) {
  return (
    <div className="gap-4">
      <div className="absolute flex flex-row justify-between">
        <BackButton backHref={backHref} />
      </div>
      <div className="relative mx-auto w-fit">
        <ProfileImage profile={profile} />
        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="bg-black px-1 font-bold tracking-widest text-white">
            {profile.channel_name}
          </h1>
        </div>
      </div>
    </div>
  );
}
