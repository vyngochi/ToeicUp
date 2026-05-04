import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { WordSet } from '@/types/learning.types'

interface WordSetCardProps {
  word_set: WordSet
}
export default function WordSetCard({ word_set }: WordSetCardProps) {
  return (
    <Card className="relative mx-auto w-62.5 max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://github.com/shadcn.png"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Level: {word_set.level}</Badge>
        </CardAction>
        <CardTitle className="font-bold">{word_set.name}</CardTitle>
        <CardDescription className="text-xs">{word_set.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Học từ vựng</Button>
      </CardFooter>
    </Card>
  )
}
