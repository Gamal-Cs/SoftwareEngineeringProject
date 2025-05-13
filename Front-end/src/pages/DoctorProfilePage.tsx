import React, { useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Stethoscope,
  Camera,
  Save,
  Award,
  Clock,
  Edit,
  X,
  Calendar,
  Briefcase,
  BookOpen,
  Shield
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface DoctorProfile {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  hospital: string;
  license: string;
  experience: string;
  education: string;
  achievements: string;
  bio: string;
  imageUrl: string;
  joinDate: string;
  certifications: string[];
}

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState<DoctorProfile>({
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    specialization: "General Dentistry",
    hospital: "blue Care Center",
    license: "DENT123456",
    experience: "15 years",
    education: "DDS, Harvard University",
    achievements: "Board Certified, American blue Association",
    bio: "Experienced dentist specializing in general and cosmetic dentistry with a focus on patient comfort and satisfaction. Committed to providing the highest quality blue care using the latest techniques and technologies.",
    imageUrl: "/doctor-avatar.jpg",
    joinDate: "2010-05-15",
    certifications: [
      "American Board of blue Examiners",
      "Advanced Cosmetic Dentistry",
      "Pediatric Dentistry Certification"
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempImage) {
      setProfile({ ...profile, imageUrl: tempImage });
      setTempImage(null);
    }
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
    setIsEditing(false);
  };

  return (
    <PageLayout>
      <SectionTitle
        title="Doctor Profile"
        subtitle="Manage your professional profile and credentials"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-blue-600 h-40 relative">
                {isEditing && (
                  <div className="absolute right-4 top-4">
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-image"
                      className="bg-white p-2 rounded-full shadow-md cursor-pointer flex items-center justify-center"
                    >
                      <Camera className="h-5 w-5 text-blue-600" />
                    </label>
                  </div>
                )}
              </div>
              
              <div className="px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 -mt-20">
                    <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
                      <AvatarImage src={tempImage || profile.imageUrl} />
                      <AvatarFallback>
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 pt-4">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-blue-600 font-medium">{profile.specialization}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-600">{profile.hospital}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "outline" : "default"}
                        className={isEditing ? "text-blue-600 border-blue-600" : "bg-blue-600 hover:bg-blue-600"}
                      >
                        {isEditing ? (
                          <>
                            <X className="h-5 w-5 mr-2" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit className="h-5 w-5 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label>Full Name</Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              value={profile.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Email</Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Phone</Label>
                          <div className="relative mt-1">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              type="tel"
                              value={profile.phone}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Specialization</Label>
                          <div className="relative mt-1">
                            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              value={profile.specialization}
                              onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Hospital/Clinic</Label>
                          <div className="relative mt-1">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              value={profile.hospital}
                              onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>License Number</Label>
                          <div className="relative mt-1">
                            <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              value={profile.license}
                              onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Experience</Label>
                          <div className="relative mt-1">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              value={profile.experience}
                              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Education</Label>
                          <div className="relative mt-1">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                            <Input
                              value={profile.education}
                              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Bio</Label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          rows={4}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label>Achievements & Certifications</Label>
                        <div className="mt-2 space-y-2">
                          {isEditing ? (
                            <textarea
                              value={profile.certifications.join('\n')}
                              onChange={(e) => setProfile({ 
                                ...profile, 
                                certifications: e.target.value.split('\n') 
                              })}
                              className="w-full p-3 border rounded-lg"
                              rows={4}
                            />
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {profile.certifications.map((cert, index) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end gap-4 pt-4">
                          <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-600"
                          >
                            <Save className="h-5 w-5 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-600 rounded-full">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Member Since</h4>
                        <p className="text-blue-600">{profile.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Experience</h4>
                        <p className="text-blue-600">{profile.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">License</h4>
                        <p className="text-blue-600">{profile.license}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}