'use client';

import { Task, Job } from '@/types/game';
import { FormatText } from '@/lib/formatText';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  task: Task;
  job: Job;
  onNext: () => void;
  isLastTask: boolean;
}

export default function SuccessModal({ task, job, onNext, isLastTask }: Props) {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <DialogTitle className="text-2xl mb-2">Task Complete!</DialogTitle>
            <DialogDescription>
              {isLastTask ? 'Job finished!' : `Task ${task.order}/${job.tasks.length} complete`}
            </DialogDescription>
          </div>
        </DialogHeader>

        <Card className="bg-muted">
          <CardContent className="pt-6">
            {isLastTask ? (
              <>
                <p className="text-muted-foreground italic whitespace-pre-line">
                  <FormatText text={job.successMessage.trim()} />
                </p>
                <p className="text-muted-foreground/70 text-right mt-2">- {job.clientName}</p>
              </>
            ) : (
              <p className="text-muted-foreground">Great work! Ready for the next task?</p>
            )}
          </CardContent>
        </Card>

        <Button onClick={onNext} autoFocus className="w-full">
          {isLastTask ? 'Finish Job' : 'Next Task'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
