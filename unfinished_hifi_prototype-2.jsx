import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CircleAlert,
  Clock3,
  Filter,
  GripHorizontal,
  Home,
  Inbox,
  ListChecks,
  Lock,
  LogIn,
  Mail,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  TriangleAlert,
  Undo2,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const initialTasks = [
  {
    id: 1,
    title: "Confirm catering",
    owner: null,
    due: "Mar 18",
    status: "unclaimed",
    urgentReason: "Due soon",
    description: "Finalize vendor and submit exact headcount.",
    dependency: "Budget approval",
    event: "Spring Gala",
    history: ["Created by Rakul", "Budget sheet linked"],
    resources: ["Catering quote", "Budget sheet"],
  },
  {
    id: 2,
    title: "Book venue DJ",
    owner: "Jaivik",
    due: "Mar 19",
    status: "in_progress",
    urgentReason: "Due soon",
    description: "Confirm DJ timing and deposit.",
    dependency: "Venue timeline",
    event: "Spring Gala",
    history: ["Claimed by Jaivik", "Deposit draft prepared"],
    resources: ["Venue contract"],
  },
  {
    id: 3,
    title: "Design poster",
    owner: "Marcus",
    due: "Mar 20",
    status: "blocked",
    urgentReason: "Blocked by dependency",
    description: "Poster needs final room and ticket price.",
    dependency: "Room number + pricing",
    event: "Spring Gala",
    blocker: "Still waiting on venue room confirmation.",
    history: ["Claimed by Marcus", "Blocked: waiting on room confirmation"],
    resources: ["Poster draft"],
  },
  {
    id: 4,
    title: "Social media caption",
    owner: "Naovi",
    due: "Mar 17",
    status: "needs_reassignment",
    urgentReason: "Needs reassignment",
    description: "Instagram caption for final promo push.",
    dependency: "Poster + ticket link",
    event: "Spring Gala",
    handoff: "Draft is 80% done. Need final CTA and ticket link.",
    history: ["Claimed by Naovi", "Reassignment requested"],
    resources: ["Draft caption doc"],
  },
  {
    id: 5,
    title: "Buy snacks",
    owner: "Rakul",
    due: "Mar 17",
    status: "done",
    urgentReason: "Completed",
    description: "Purchase event-day snacks from Costco.",
    dependency: "Approved budget",
    event: "Spring Gala",
    history: ["Claimed by Rakul", "Marked done"],
    resources: ["Receipt photo"],
  },
];

const statusMeta = {
  unclaimed: { label: "Unclaimed", tone: "bg-slate-100 text-slate-700 border-slate-200" },
  claimed: { label: "Claimed", tone: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  blocked: { label: "Blocked", tone: "bg-red-50 text-red-700 border-red-200" },
  needs_reassignment: { label: "Needs Reassignment", tone: "bg-violet-50 text-violet-700 border-violet-200" },
  done: { label: "Done", tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

const urgencyTone = {
  "Due soon": "bg-orange-100 text-orange-700",
  "Blocked by dependency": "bg-red-100 text-red-700",
  "Needs reassignment": "bg-violet-100 text-violet-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const phoneFrame = "mx-auto w-[390px] h-[844px] rounded-[38px] border border-black/10 bg-neutral-950 p-2 shadow-2xl";
const phoneInner = "relative h-full w-full overflow-hidden rounded-[30px] bg-[#F6F7FB]";

function App() {
  const flowButtons = [
    { label: "Splash", action: () => setScreen("splash") },
    { label: "Login", action: () => setScreen("login") },
    { label: "Sign Up", action: () => setScreen("signup") },
    { label: "Onboarding", action: () => setScreen("onboarding") },
    { label: "Dashboard", action: () => { setTab("dashboard"); setScreen("dashboard"); } },
    { label: "My Tasks", action: () => { setTab("my_tasks"); setScreen("mytasks"); } },
    { label: "Task Detail", action: () => { setSelectedId(1); setScreen("task"); } },
    { label: "Blocked Flow", action: () => { setSelectedId(3); setScreen("blocked"); } },
    { label: "Reassign Flow", action: () => { setSelectedId(4); setScreen("reassign"); } },
    { label: "Create Task", action: () => setScreen("create") },
  ];
  const [screen, setScreen] = useState("splash");
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState(1);
  const [tab, setTab] = useState("dashboard");
  const [eventName, setEventName] = useState("Spring Gala");
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("urgency");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("all");
  const [createDraft, setCreateDraft] = useState({
    title: "",
    assignTo: "unassigned",
    due: "Mar 22",
    description: "",
    dependency: "",
  });
  const [blockerText, setBlockerText] = useState("");
  const [handoffText, setHandoffText] = useState("");
  const [confirm, setConfirm] = useState(null);

  const selectedTask = tasks.find((t) => t.id === selectedId) || tasks[0];

  const dashboardTasks = useMemo(() => {
    let list = tasks.filter((t) => t.event === eventName);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.owner || "").toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q)
      );
    }
    if (filter !== "all") list = list.filter((t) => t.status === filter);
    const score = { blocked: 1, needs_reassignment: 2, unclaimed: 3, in_progress: 4, claimed: 5, done: 6 };
    list.sort((a, b) => (sort === "urgency" ? score[a.status] - score[b.status] : a.title.localeCompare(b.title)));
    return list;
  }, [tasks, eventName, search, filter, sort]);

  const myTasks = dashboardTasks.filter((t) => t.owner === "Jaivik");

  const grouped = {
    urgent: dashboardTasks.filter((t) => ["unclaimed", "claimed", "in_progress"].includes(t.status) && t.status !== "done"),
    blocked: dashboardTasks.filter((t) => t.status === "blocked"),
    reassign: dashboardTasks.filter((t) => t.status === "needs_reassignment"),
    done: dashboardTasks.filter((t) => t.status === "done"),
  };

  const fireToast = (message, undo) => {
    setToast({ message, undo });
    setTimeout(() => setToast(null), 3500);
  };

  const patchTask = (id, updates, toastMessage, undoFn) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    if (toastMessage) fireToast(toastMessage, undoFn);
  };

  const openTask = (id) => {
    setSelectedId(id);
    setScreen("task");
  };

  const claimTask = (task) => {
    const before = task.owner;
    const beforeStatus = task.status;
    patchTask(
      task.id,
      {
        owner: "Jaivik",
        status: "in_progress",
        history: [...(task.history || []), "Claimed by Jaivik"],
      },
      "Task claimed and moved to My Tasks",
      () => patchTask(task.id, { owner: before, status: beforeStatus }, "Claim undone")
    );
  };

  const markDone = (task) => {
    const beforeStatus = task.status;
    patchTask(
      task.id,
      { status: "done", urgentReason: "Completed", history: [...(task.history || []), "Marked done"] },
      "Marked done",
      () => patchTask(task.id, { status: beforeStatus, urgentReason: task.urgentReason }, "Reopened task")
    );
  };

  const unclaimTask = (task) => {
    setConfirm({
      title: "Unclaim this task?",
      description: "This will return it to the unclaimed list.",
      onConfirm: () => {
        patchTask(task.id, { owner: null, status: "unclaimed" }, "Task returned to unclaimed");
        setConfirm(null);
      },
    });
  };

  const submitBlocked = () => {
    if (!blockerText.trim()) return;
    patchTask(selectedTask.id, {
      status: "blocked",
      blocker: blockerText,
      urgentReason: "Blocked by dependency",
      history: [...(selectedTask.history || []), `Blocked: ${blockerText}`],
    }, "Task marked blocked");
    setBlockerText("");
    setScreen("task");
  };

  const resolveBlocker = (task) => {
    patchTask(task.id, {
      status: "in_progress",
      blocker: "",
      urgentReason: "Due soon",
      history: [...(task.history || []), "Blocker resolved"],
    }, "Task unblocked");
  };

  const requestReassign = () => {
    if (!handoffText.trim()) return;
    patchTask(selectedTask.id, {
      status: "needs_reassignment",
      handoff: handoffText,
      urgentReason: "Needs reassignment",
      history: [...(selectedTask.history || []), `Reassignment note: ${handoffText}`],
    }, "Reassignment requested");
    setHandoffText("");
    setScreen("task");
  };

  const createTask = () => {
    if (!createDraft.title.trim()) return;
    const newTask = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      title: createDraft.title,
      owner: createDraft.assignTo === "unassigned" ? null : createDraft.assignTo,
      due: createDraft.due,
      status: createDraft.assignTo === "unassigned" ? "unclaimed" : "claimed",
      urgentReason: "Due soon",
      description: createDraft.description,
      dependency: createDraft.dependency,
      event: eventName,
      history: ["Task created"],
      resources: [],
    };
    setTasks((prev) => [newTask, ...prev]);
    setCreateDraft({ title: "", assignTo: "unassigned", due: "Mar 22", description: "", dependency: "" });
    setScreen("dashboard");
    fireToast("New task created");
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <Splash onContinue={() => setScreen("login")} />;
      case "login":
        return <Login onLogin={() => setScreen("onboarding")} onSignup={() => setScreen("signup")} />;
      case "signup":
        return <Signup onSignup={() => setScreen("onboarding")} onBack={() => setScreen("login")} />;
      case "onboarding":
        return <Onboarding onDone={() => setScreen("dashboard")} />;
      case "dashboard":
        return (
          <MainShell tab={tab} setTab={setTab} onCompose={() => setScreen("create")}>
            <Dashboard
              eventName={eventName}
              setEventName={setEventName}
              grouped={grouped}
              openTask={openTask}
              claimTask={claimTask}
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              filter={filter}
              setFilter={setFilter}
            />
          </MainShell>
        );
      case "mytasks":
        return (
          <MainShell tab={tab} setTab={setTab} onCompose={() => setScreen("create")}>
            <MyTasks tasks={myTasks} openTask={openTask} markDone={markDone} />
          </MainShell>
        );
      case "task":
        return (
          <TaskDetail
            task={selectedTask}
            onBack={() => setScreen(tab === "my_tasks" ? "mytasks" : "dashboard")}
            onClaim={() => claimTask(selectedTask)}
            onDone={() => markDone(selectedTask)}
            onBlocked={() => setScreen("blocked")}
            onReassign={() => setScreen("reassign")}
            onResolve={() => resolveBlocker(selectedTask)}
            onUnclaim={() => unclaimTask(selectedTask)}
          />
        );
      case "blocked":
        return <BlockedFlow task={selectedTask} value={blockerText} setValue={setBlockerText} onBack={() => setScreen("task")} onSubmit={submitBlocked} />;
      case "reassign":
        return <ReassignFlow task={selectedTask} value={handoffText} setValue={setHandoffText} onBack={() => setScreen("task")} onSubmit={requestReassign} />;
      case "create":
        return <CreateTaskScreen draft={createDraft} setDraft={setCreateDraft} onBack={() => setScreen("dashboard")} onCreate={createTask} />;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (tab === "dashboard") setScreen("dashboard");
    if (tab === "my_tasks") setScreen("mytasks");
  }, [tab]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#EAEFFF,white_45%,#EFF2F6)] p-8">
      <div className="mx-auto mb-8 max-w-5xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Unfinished</h1>
        <p className="mt-2 text-sm text-slate-600">High-fidelity mobile prototype for keeping incomplete event tasks visible, assignable, and recoverable.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_390px_220px] items-start justify-center">
        <Card className="border-white/70 bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base">Flows</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {flowButtons.slice(0, 5).map((flow) => (
              <Button key={flow.label} variant="outline" className="justify-start rounded-2xl" onClick={flow.action}>
                {flow.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className={phoneFrame}>
          <div className={phoneInner}>
            <div className="flex h-7 items-center justify-center text-[11px] font-medium text-slate-700">9:41</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-[calc(100%-28px)]"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  className="absolute bottom-24 left-4 right-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{toast.message}</span>
                    {toast.undo ? (
                      <button className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium" onClick={toast.undo}>
                        Undo
                      </button>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Dialog open={!!confirm} onOpenChange={() => setConfirm(null)}>
              <DialogContent className="max-w-[320px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle>{confirm?.title}</DialogTitle>
                  <DialogDescription>{confirm?.description}</DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setConfirm(null)}>Cancel</Button>
                  <Button className="flex-1 rounded-xl" onClick={confirm?.onConfirm}>Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="border-white/70 bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base">More Flows</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {flowButtons.slice(5).map((flow) => (
              <Button key={flow.label} variant="outline" className="justify-start rounded-2xl" onClick={flow.action}>
                {flow.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Splash({ onContinue }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(180deg,#0F172A_0%,#18243B_42%,#2E466B_100%)] px-8 text-white">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8 rounded-[28px] bg-white/10 p-5 backdrop-blur">
        <ListChecks className="h-12 w-12" />
      </motion.div>
      <h2 className="text-4xl font-semibold tracking-tight">Unfinished</h2>
      <p className="mt-3 text-center text-sm leading-6 text-white/80">Keep incomplete tasks visible so event work does not get buried in chat.</p>
      <Button className="mt-10 w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90" onClick={onContinue}>Continue</Button>
    </div>
  );
}

function Login({ onLogin, onSignup }) {
  return (
    <div className="flex h-full flex-col bg-[#0F172A] px-6 pb-8 pt-10 text-white">
      <div className="mb-10">
        <div className="mb-3 inline-flex rounded-2xl bg-white/10 p-3"><LogIn className="h-5 w-5" /></div>
        <h2 className="text-3xl font-semibold">Welcome back</h2>
        <p className="mt-2 text-sm text-white/70">Sign in to see what is urgent, blocked, and still unfinished.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block text-white/70">Email</Label>
          <Input className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="jaivik@queensu.ca" />
        </div>
        <div>
          <Label className="mb-2 block text-white/70">Password</Label>
          <Input type="password" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="••••••••" />
        </div>
      </div>
      <Button className="mt-6 h-12 rounded-2xl bg-white text-slate-900 hover:bg-white/90" onClick={onLogin}>Log in</Button>
      <button className="mt-4 text-sm text-white/70">Forgot password?</button>
      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
        New here?
        <button className="ml-1 font-medium text-white" onClick={onSignup}>Create an account</button>
      </div>
    </div>
  );
}

function Signup({ onSignup, onBack }) {
  return (
    <div className="h-full overflow-auto bg-white px-6 pb-8 pt-6">
      <button className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-700" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</button>
      <h2 className="text-3xl font-semibold text-slate-900">Create account</h2>
      <p className="mt-2 text-sm text-slate-500">Join your event workspace and keep ownership clear.</p>
      <div className="mt-6 space-y-4">
        <Field icon={User} label="Full name" placeholder="Jaivik Joshi" />
        <Field icon={Mail} label="School email" placeholder="jaivik@queensu.ca" />
        <Field icon={Lock} label="Password" placeholder="Choose a password" />
        <Field icon={Users} label="Club invite code" placeholder="QSAA-2026" />
      </div>
      <Button className="mt-8 h-12 w-full rounded-2xl" onClick={onSignup}>Join workspace</Button>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder }) {
  return (
    <div>
      <Label className="mb-2 block text-slate-700">{label}</Label>
      <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
        <Icon className="h-4 w-4 text-slate-400" />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder={placeholder} />
      </div>
    </div>
  );
}

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const slides = [
    { title: "See the current truth fast", body: "Dashboard groups urgent, blocked, and reassignment tasks so you do not have to reconstruct decisions from chat." },
    { title: "Own your work clearly", body: "My Tasks keeps your responsibilities focused and easy to update in short mobile sessions." },
    { title: "Recover when plans change", body: "Blockers, handoff notes, and undo feedback make mistakes and coordination changes easier to manage." },
  ];
  const item = slides[step];
  return (
    <div className="flex h-full flex-col bg-white px-6 pb-8 pt-10">
      <div className="mb-8 flex gap-2">
        {slides.map((_, i) => <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-slate-900" : "bg-slate-200"}`} />)}
      </div>
      <div className="rounded-[32px] bg-[linear-gradient(180deg,#EEF3FF_0%,#F8FAFC_100%)] p-6">
        <div className="mb-5 inline-flex rounded-2xl bg-white p-3 shadow-sm">
          {step === 0 ? <Home className="h-5 w-5" /> : step === 1 ? <Inbox className="h-5 w-5" /> : <Undo2 className="h-5 w-5" />}
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
      </div>
      <div className="mt-auto flex gap-3">
        {step > 0 ? <Button variant="outline" className="h-12 flex-1 rounded-2xl" onClick={() => setStep(step - 1)}>Back</Button> : null}
        {step < slides.length - 1 ? <Button className="h-12 flex-1 rounded-2xl" onClick={() => setStep(step + 1)}>Next</Button> : <Button className="h-12 flex-1 rounded-2xl" onClick={onDone}>Start using Unfinished</Button>}
      </div>
    </div>
  );
}

function MainShell({ children, tab, setTab, onCompose }) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      <button onClick={onCompose} className="absolute bottom-24 right-5 z-10 rounded-full bg-slate-900 p-4 text-white shadow-xl"><Plus className="h-5 w-5" /></button>
      <div className="mx-3 mb-3 mt-2 rounded-[28px] border border-white/80 bg-white/95 p-2 shadow-lg backdrop-blur">
        <div className="grid grid-cols-3 gap-2">
          <NavItem icon={Home} label="Dashboard" active={tab === "dashboard"} onClick={() => setTab("dashboard")} />
          <NavItem icon={Inbox} label="My Tasks" active={tab === "my_tasks"} onClick={() => setTab("my_tasks")} />
          <NavItem icon={Settings} label="Settings" active={false} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-[20px] px-3 py-3 ${active ? "bg-slate-900 text-white" : "text-slate-500"}`}>
      <div className="flex items-center justify-center"><Icon className="h-5 w-5" /></div>
    </button>
  );
}

function Dashboard({ eventName, setEventName, grouped, openTask, claimTask, search, setSearch, sort, setSort, showFilter, setShowFilter, filter, setFilter }) {
  return (
    <div className="px-4 pb-24 pt-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Current event</p>
          <Select value={eventName} onValueChange={setEventName}>
            <SelectTrigger className="mt-1 h-10 w-[170px] rounded-2xl border-0 bg-transparent px-0 text-xl font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Spring Gala">Spring Gala</SelectItem>
              <SelectItem value="Diwali Night">Diwali Night</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <button className="rounded-2xl bg-white p-3 shadow-sm"><Bell className="h-4 w-4 text-slate-700" /></button>
          <button className="rounded-2xl bg-white p-3 shadow-sm"><User className="h-4 w-4 text-slate-700" /></button>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} className="h-12 rounded-2xl border-0 bg-white pl-10 shadow-sm" placeholder="Search tasks, owners, notes" />
        </div>
        <button className="rounded-2xl bg-white px-4 shadow-sm" onClick={() => setShowFilter(!showFilter)}><Filter className="h-4 w-4 text-slate-700" /></button>
      </div>

      {showFilter ? (
        <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-2 block text-xs text-slate-500">Sort</Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgency">Urgency</SelectItem>
                  <SelectItem value="alpha">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block text-xs text-slate-500">Filter</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tasks</SelectItem>
                  <SelectItem value="unclaimed">Unclaimed</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="needs_reassignment">Needs reassignment</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-[30px] bg-slate-900 p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/70">Event readiness</div>
            <div className="mt-1 text-3xl font-semibold">72%</div>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm">12 active tasks</div>
        </div>
        <Progress value={72} className="mt-4 h-2 bg-white/15" />
      </div>

      <Section title="Urgent Tasks" count={grouped.urgent.length}>
        {grouped.urgent.length ? grouped.urgent.map((task) => <TaskCard key={task.id} task={task} openTask={openTask} claimTask={claimTask} />) : <Empty text="No urgent tasks right now." />}
      </Section>
      <Section title="Blocked" count={grouped.blocked.length}>
        {grouped.blocked.length ? grouped.blocked.map((task) => <TaskCard key={task.id} task={task} openTask={openTask} claimTask={claimTask} />) : <Empty text="Nothing is blocked." />}
      </Section>
      <Section title="Needs Reassignment" count={grouped.reassign.length}>
        {grouped.reassign.length ? grouped.reassign.map((task) => <TaskCard key={task.id} task={task} openTask={openTask} claimTask={claimTask} />) : <Empty text="No handoffs waiting." />}
      </Section>
      <Section title="Completed Today" count={grouped.done.length}>
        {grouped.done.length ? grouped.done.map((task) => <TaskCard key={task.id} task={task} openTask={openTask} claimTask={claimTask} />) : <Empty text="No completed tasks yet." />}
      </Section>
    </div>
  );
}

function Section({ title, count, children }) {
  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <Badge variant="secondary" className="rounded-full bg-slate-200 px-2.5 py-1 text-xs text-slate-700">{count}</Badge>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function TaskCard({ task, openTask, claimTask }) {
  const status = statusMeta[task.status];
  return (
    <Card className="rounded-[24px] border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="truncate text-sm font-semibold text-slate-900">{task.title}</h4>
              <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${urgencyTone[task.urgentReason] || "bg-slate-100 text-slate-700"}`}>{task.urgentReason}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1"><User className="h-3 w-3" /> {task.owner || "Unassigned"}</span>
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {task.due}</span>
            </div>
          </div>
          <button className="rounded-full p-2 text-slate-400"><MoreHorizontal className="h-4 w-4" /></button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <Badge className={`rounded-full border px-2.5 py-1 font-medium ${status.tone}`}>{status.label}</Badge>
          <div className="flex gap-2">
            {task.status === "unclaimed" ? <Button size="sm" className="h-9 rounded-xl px-3 text-xs" onClick={() => claimTask(task)}>Claim</Button> : null}
            <Button size="sm" variant="outline" className="h-9 rounded-xl px-3 text-xs" onClick={() => openTask(task.id)}>Open</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Empty({ text }) {
  return <div className="rounded-[24px] border border-dashed border-slate-200 bg-white/70 p-4 text-sm text-slate-500">{text}</div>;
}

function MyTasks({ tasks, openTask, markDone }) {
  return (
    <div className="px-4 pb-24 pt-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Focused view</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">My Tasks</h2>
        </div>
        <div className="rounded-2xl bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">{tasks.length} assigned</div>
      </div>
      <div className="mt-4 space-y-3">
        {tasks.length ? tasks.map((task) => (
          <Card key={task.id} className="rounded-[24px] border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
                  <div className="mt-2 flex gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> Due {task.due}</span>
                    <span className={`rounded-full px-2 py-1 ${urgencyTone[task.urgentReason] || "bg-slate-100 text-slate-700"}`}>{task.urgentReason}</span>
                  </div>
                </div>
                <Badge className={`rounded-full border ${statusMeta[task.status].tone}`}>{statusMeta[task.status].label}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button variant="outline" className="h-10 rounded-xl text-xs" onClick={() => openTask(task.id)}>Details</Button>
                <Button variant="outline" className="h-10 rounded-xl text-xs">Blocked</Button>
                <Button className="h-10 rounded-xl text-xs" onClick={() => markDone(task)}>Done</Button>
              </div>
            </CardContent>
          </Card>
        )) : <Empty text="No tasks assigned to you yet." />}
      </div>
    </div>
  );
}

function TaskDetail({ task, onBack, onClaim, onDone, onBlocked, onReassign, onResolve, onUnclaim }) {
  const status = statusMeta[task.status];
  return (
    <div className="h-full overflow-auto bg-white px-4 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <button className="rounded-2xl bg-slate-100 p-3 text-slate-700" onClick={onBack}><ArrowLeft className="h-4 w-4" /></button>
        <div className="text-sm font-medium text-slate-500">Task Detail</div>
        <button className="rounded-2xl bg-slate-100 p-3 text-slate-700"><Pencil className="h-4 w-4" /></button>
      </div>

      <div className="mt-4 rounded-[30px] bg-slate-900 p-5 text-white">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-semibold">{task.title}</h2>
          <Badge className={`rounded-full border ${status.tone}`}>{status.label}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80">
          <InfoMini label="Owner" value={task.owner || "Unassigned"} icon={User} />
          <InfoMini label="Due" value={task.due} icon={CalendarDays} />
          <InfoMini label="Urgent because" value={task.urgentReason} icon={TriangleAlert} />
          <InfoMini label="Dependency" value={task.dependency || "None"} icon={GripHorizontal} />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Card className="rounded-[24px] border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Description</div>
            <p className="mt-2 text-sm leading-6 text-slate-700">{task.description}</p>
          </CardContent>
        </Card>

        {task.blocker ? (
          <Card className="rounded-[24px] border-0 bg-red-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-700"><ShieldAlert className="h-4 w-4" /> Current blocker</div>
              <p className="mt-2 text-sm leading-6 text-red-700/90">{task.blocker}</p>
            </CardContent>
          </Card>
        ) : null}

        {task.handoff ? (
          <Card className="rounded-[24px] border-0 bg-violet-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-violet-700"><Users className="h-4 w-4" /> Handoff note</div>
              <p className="mt-2 text-sm leading-6 text-violet-700/90">{task.handoff}</p>
            </CardContent>
          </Card>
        ) : null}

        <Card className="rounded-[24px] border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Resources</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(task.resources || []).map((item) => <Badge key={item} variant="secondary" className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{item}</Badge>)}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Latest history</div>
            <div className="mt-3 space-y-3">
              {(task.history || []).slice(-3).reverse().map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-600">
                  <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 pb-6">
        {task.status === "unclaimed" ? <Button className="h-12 rounded-2xl" onClick={onClaim}>Claim Task</Button> : null}
        {task.status !== "done" ? <Button variant="outline" className="h-12 rounded-2xl" onClick={onDone}>Mark Done</Button> : <Button variant="outline" className="h-12 rounded-2xl" onClick={onResolve}>Reopen Task</Button>}
        {task.status !== "blocked" ? <Button variant="outline" className="h-12 rounded-2xl" onClick={onBlocked}>Mark Blocked</Button> : <Button variant="outline" className="h-12 rounded-2xl" onClick={onResolve}>Resolve Blocker</Button>}
        <Button variant="outline" className="h-12 rounded-2xl" onClick={onReassign}>Request Reassignment</Button>
        {task.owner === "Jaivik" ? <Button variant="outline" className="col-span-2 h-12 rounded-2xl" onClick={onUnclaim}>Unclaim Task</Button> : null}
      </div>
    </div>
  );
}

function InfoMini({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/55"><Icon className="h-3 w-3" /> {label}</div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

function BlockedFlow({ task, value, setValue, onBack, onSubmit }) {
  return (
    <div className="h-full overflow-auto bg-white px-4 pb-8 pt-4">
      <button className="flex items-center gap-2 text-sm font-medium text-slate-700" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</button>
      <div className="mt-5 rounded-[28px] bg-red-50 p-5">
        <div className="inline-flex rounded-2xl bg-white p-3 text-red-600 shadow-sm"><CircleAlert className="h-5 w-5" /></div>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">Why is this blocked?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Add a short reason so the team knows what is needed to unblock {task.title.toLowerCase()}.</p>
      </div>
      <div className="mt-5">
        <Label className="mb-2 block text-slate-700">Blocked reason</Label>
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} className="min-h-[160px] rounded-3xl" placeholder="Waiting on venue room confirmation before final poster export." />
      </div>
      <Button className="mt-6 h-12 w-full rounded-2xl" onClick={onSubmit}>Save blocker</Button>
    </div>
  );
}

function ReassignFlow({ task, value, setValue, onBack, onSubmit }) {
  return (
    <div className="h-full overflow-auto bg-white px-4 pb-8 pt-4">
      <button className="flex items-center gap-2 text-sm font-medium text-slate-700" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</button>
      <div className="mt-5 rounded-[28px] bg-violet-50 p-5">
        <div className="inline-flex rounded-2xl bg-white p-3 text-violet-600 shadow-sm"><UserPlus className="h-5 w-5" /></div>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">Request reassignment</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Leave a handoff note so the next owner does not need to dig through chat.</p>
      </div>
      <div className="mt-5">
        <Label className="mb-2 block text-slate-700">Handoff note</Label>
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} className="min-h-[160px] rounded-3xl" placeholder="Poster is almost done. Only need final room number and ticket link before posting." />
      </div>
      <Button className="mt-6 h-12 w-full rounded-2xl" onClick={onSubmit}>Move to reassignment</Button>
    </div>
  );
}

function CreateTaskScreen({ draft, setDraft, onBack, onCreate }) {
  return (
    <div className="h-full overflow-auto bg-white px-4 pb-8 pt-4">
      <button className="flex items-center gap-2 text-sm font-medium text-slate-700" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</button>
      <h2 className="mt-5 text-3xl font-semibold text-slate-900">Create Task</h2>
      <p className="mt-2 text-sm text-slate-500">Replace vague chat requests with clear ownership and deadlines.</p>
      <div className="mt-6 space-y-4">
        <div>
          <Label className="mb-2 block text-slate-700">Task name</Label>
          <Input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} className="h-12 rounded-2xl" placeholder="Buy table decor" />
        </div>
        <div>
          <Label className="mb-2 block text-slate-700">Assign to</Label>
          <Select value={draft.assignTo} onValueChange={(v) => setDraft((d) => ({ ...d, assignTo: v }))}>
            <SelectTrigger className="h-12 rounded-2xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="Jaivik">Jaivik</SelectItem>
              <SelectItem value="Rakul">Rakul</SelectItem>
              <SelectItem value="Marcus">Marcus</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block text-slate-700">Due date</Label>
          <Select value={draft.due} onValueChange={(v) => setDraft((d) => ({ ...d, due: v }))}>
            <SelectTrigger className="h-12 rounded-2xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Mar 17">Mar 17</SelectItem>
              <SelectItem value="Mar 18">Mar 18</SelectItem>
              <SelectItem value="Mar 19">Mar 19</SelectItem>
              <SelectItem value="Mar 22">Mar 22</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block text-slate-700">Description</Label>
          <Textarea value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} className="min-h-[120px] rounded-3xl" placeholder="Buy decor pieces and keep the receipt for reimbursement." />
        </div>
        <div>
          <Label className="mb-2 block text-slate-700">Dependency</Label>
          <Input value={draft.dependency} onChange={(e) => setDraft((d) => ({ ...d, dependency: e.target.value }))} className="h-12 rounded-2xl" placeholder="Budget approval" />
        </div>
      </div>
      <Button className="mt-6 h-12 w-full rounded-2xl" onClick={onCreate}>Create task</Button>
    </div>
  );
}

export default App;
