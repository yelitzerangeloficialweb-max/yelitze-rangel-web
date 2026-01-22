export default function ProgressBar({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div
                className="h-full bg-[var(--color-secondary)] transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
