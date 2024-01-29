import Link from 'next/link'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"


export function Ad() {


  return (
    <Card className="mb-6">
      <CardHeader className="grid grid-cols-3 items-start gap-2 space-y-0">
        <Link href="/">
          <Image
            src="/portcodelogo.png"
            alt="Portcode"
            width={100}
            height={100}
          />
        </Link>
        <div className="space-y-1 col-span-2">

          <Link href="/">  <CardTitle className='mb-1'>No portfolio site?</CardTitle></Link>
  
          <Link href="/">  <CardDescription>
            Portcode is the portfolio site builder for developers. Signup to reserve your custom portco.de address.
          </CardDescription></Link>
        </div>

      </CardHeader>
    </Card>
  )
}