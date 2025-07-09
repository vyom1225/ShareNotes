import { FileText, FolderOpen, Plus, Share2, Star, Wand2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-4">
        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create your next great document
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start writing, collaborating, and sharing with powerful tools designed for modern teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rich Text Editing</h3>
            <p className="text-gray-600">Create beautiful documents with advanced formatting, tables, and media support.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Collaboration</h3>
            <p className="text-gray-600">Work together seamlessly with live editing, comments, and version history.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wand2 className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Powered</h3>
            <p className="text-gray-600">Turn long documents into concise summaries and translate them in one click.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}
