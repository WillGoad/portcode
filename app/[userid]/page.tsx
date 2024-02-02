'use client';
import { Ad } from '@/components/misc/ad';
import { HighlightedRepo } from '@/components/misc/highlighted-repo';
import { ShowOffSection } from '@/components/misc/show-off-section';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [displayname, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [highlightedRepo, setHighlightedRepo] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = async () => {
    try {
      const response = await fetch(`https://api.portco.de/user/${params.userid}`);
      //If status code 200 then change tab
      if (response.status === 200) {
        const { displayname, username, highlightedRepo, experiences, qrcodeuri } = await response.json();
        setDisplayname(displayname);
        setUsername(username);
        setHighlightedRepo(highlightedRepo);
        setExperiences(experiences);
        setQrCode(qrcodeuri);
      } else {
        toast({
          title: `User ${params.userid} not found!`,
          description: 'Redirecting to home',
          variant: "destructive",
          duration: 3000,
        })
        router.push("/")
      }
    } catch (error) {
      toast({
        title: `Error!`,
        description: `${error}`,
        variant: "destructive",
        duration: 3000,
      })
      router.push("/")
    }
  }

if (!displayname) {
  return <div></div>
};
return (
  <div className="flex-1 flex flex-start items-center flex-col mt-16">
    <div className="w-5/6 sm:w-96">
      <Ad />
    </div>
    {qrCode && <img src={qrCode} alt="QR Code" />}
    <h2 className="text-2xl font-bold mb-2">{displayname}</h2>
    <p className="text-gray-400 mb-8">@{username}</p>
    {highlightedRepo && <div className="w-5/6 sm:w-96">
      <HighlightedRepo
        highlightedRepo={highlightedRepo}
      />
    </div>}
    {experiences && <div className="w-5/6 sm:w-96">
      <ShowOffSection title={"Roles"} experiences={experiences} />
    </div>}
  </div>
);

}